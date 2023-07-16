/* Imports \/ */

const express = require('express');
const mysql = require('mysql2');
const crypto = require('crypto');
const fs = require('fs');
const path = require("path");
const multer  = require('multer');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

/* Imports /\ */

/* Constants (Express, Multer, mysql connection, saltRounds for encryption, google login) \/ */


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      if (file.fieldname === 'listingImage') {
          cb(null, 'public/pictureUploads/');
      }

      else if (file.fieldname === 'listingSTL') {
          cb(null, 'stlUploads/');
      }
      
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
 
var upload = multer({storage: storage});

const router = express.Router();
const saltRounds = process.env.SALT_ROUNDS;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const key = crypto.createSecretKey(process.env.FILE_ENCRYPTION_KEY);
const newAdFilesUpload = upload.fields([{ name: 'listingImage', maxCount: 1 }, { name: 'listingSTL', maxCount: 1 }]);

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

/* Constants (Express, Multer, mysql connection, saltRounds for encryption, google login) /\ */

/* Middleware Functions \/ */

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}


async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

function checkForUser(profile, callback){
  const sqlQuery = `SELECT COUNT(1) AS myCount FROM Users 
                    WHERE email = "${profile?.email}";`;
  connection.query(sqlQuery, (err, result) => {
    if (err) throw err
    console.log(result);
    return callback(result[0].myCount);
  })
}

function checkPrivilege(req, res, next) {
  const sqlQuery = `SELECT expiryDate FROM UserPrivileges 
                    WHERE buyerEmail = "${req.user?.email}" 
                    AND FileID=${req.body.FileID};`;
  connection.query(sqlQuery, (err, result) => {
    if (err) throw err
    if(typeof result[0] !== 'undefined'){
      const todaysDate = new Date();

      if (result[0].expiryDate<todaysDate){
        res.sendStatus(403);
      } else{
        req.body.expiryDate = result[0].expiryDate;
        next()
      }
    } else{
      res.sendStatus(403);
    }
  })
}




/*
// will keep this in case i implement non google login later
// need sql query sanitisation
function authenticate(name, pass, fn) {
  const sqlQuery = ``;
  connection.query('SELECT UserID, userhash FROM Users WHERE username="'+name+'"', (err, rows, fields) => {
    if (err) throw err
      if (rows.length > 0){
        if (!module.parent) console.log('authenticating %s:%s', name, pass);
        bcrypt.compare(pass, rows[0].userhash, function(err, result) {
          if (err) return fn(err);
          if (result===true) return fn(null, rows[0].UserID)
          fn(null, null)
        });
      } else {
        return fn(null, null)
      }
  })
}*/


/* Middleware Functions /\ */


/* Routes \/ */


router.post("/signup", async (req, res) => {
  console.log("Test");
  try {
    console.log({ verified: verifyGoogleToken(req.body.credential) });
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      const sqlQuery = `INSERT INTO Users  (username, email) 
                        VALUES ("${profile?.given_name}_${profile?.family_name}", 
                        "${profile?.email}") ON DUPLICATE KEY UPDATE email=email;`;
      connection.query(sqlQuery, (err, rows, fields) => {
        if (err) throw err
      })

      res.status(201).json({
        message: "Signup was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, "mysecret", {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
});



router.post("/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      
      
      var existsInDB = false;

      checkForUser(profile, function(result){
        existsInDB = (result >= 1);
    
        if (!existsInDB) {
          return res.status(400).json({
            message: "You are not registered. Please sign up",
          });
        }
  
        res.status(201).json({
          message: "Login was successful",
          user: {
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            picture: profile?.picture,
            email: profile?.email,
            token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
              expiresIn: process.env.TOKEN_EXPIRY_LENGTH,
            }),
          },
        });
     });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
});



router.post('/plugin', function(req, res) {
  const absolutePath = path.join(__dirname, '../public/others/3DRM1.0.0-sdk8.0.0.curapackage');
  res.download(absolutePath);
});




router.get('/getFiles', async function(req, res) {
  var whereQuery = "";
  const fileKeys = ["FileID", "fileName", "fileDescription", "filePrice", "ownerEmail"];
  if(fileKeys.includes(req.query.searchField)){
    whereQuery = 'WHERE '+req.query.searchField+'="'+req.query.fieldVal+'"';
  }
  const sqlQuery = `SELECT Files.FileID AS FileID, Files.fileName AS fileName, 
                    Files.fileDescription AS fileDescription, Files.filePrice AS filePrice, 
                    Files.filePictureRoute AS filePictureRoute, Users.username AS ownerUsername 
                    FROM Files INNER JOIN Users ON Files.ownerEmail=Users.email ${whereQuery};`;
  connection.query(sqlQuery, (err, rows, fields) => {
    if (err) throw err
    res.send({entryData: rows});
  })
}); 

router.get('/yourPrivileges', authenticateToken, async function(req, res) {
  const sqlQuery = `SELECT Files.FileID AS FileID, Files.filePictureRoute AS filePictureRoute, 
                    Files.fileName AS fileName, Files.fileDescription AS fileDescription, 
                    UserPrivileges.expiryDate AS expiryDate, Users.username AS ownerUsername 
                    FROM Files INNER JOIN UserPrivileges ON Files.FileID=UserPrivileges.FileID
                    INNER JOIN Users ON Files.ownerEmail=Users.email 
                    WHERE UserPrivileges.buyerEmail="${req.user.email}";`;
  connection.query(sqlQuery, (err, rows, fields) => {
    if (err) throw err
    res.send({entryData: rows});
  })
});

router.post('/grantAccess', authenticateToken, function(req, res) {
  const numberOfDays = 3;
  const tempDate = new Date(Date.now() + numberOfDays * 1000 * 86400);
  const insertDate = `${tempDate.getFullYear()}-${tempDate.getMonth()+1}-${tempDate.getDate()}`;
  const sqlQuery = `INSERT INTO UserPrivileges (buyerEmail, FileID, expiryDate) 
                    VALUES ("${req.body.email}", ${req.body.FileID}, "${insertDate}");`;
  connection.query(sqlQuery, (err, rows, fields) => {
    if (err) throw err
    res.sendStatus(200);
  })
});


router.post('/uploadFile', authenticateToken, newAdFilesUpload, async function(req, res) {
  var picturePath = req.files.listingImage[0].path;
  picturePath = picturePath.slice(picturePath.indexOf("/", 1))
  var filePath = req.files.listingSTL[0].path;
  const sqlQuery = `INSERT INTO Files (fileName, fileDescription, 
                    filePrice, filePictureRoute, fileRoute, ownerEmail) 
                    VALUES ("${req.body.listingName}", 
                    "${req.body.listingDescription}", ${req.body.listingPrice}, 
                    "${picturePath}", "${filePath}", "${req.body.email}");`;
  connection.query(sqlQuery, (err, result, fields) => {
    if (err) throw err
    res.redirect('/');
  })
});
 

router.post('/getEncrypted', authenticateToken, checkPrivilege, async function(req, res) {
  const sqlQuery = `SELECT fileRoute FROM Files WHERE FileID=${req.body.FileID};`;
  connection.query(, (err, rows, fields) => {
    if (err) throw err
    const absolutePath = path.join(__dirname, '../'+rows[0].fileRoute);
    res.download(absolutePath);
  })
});


// To reimplement

/*
router.get('/createUser', function(req, res, next) {
  res.render('createUser');
});


router.post('/createUser', function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const sqlQuery = ``;
    connection.query('INSERT INTO Users  (username, userhash) VALUES ("'+req.body.username+'", "'+hash+'")', (err, rows, fields) => {
      if (err) throw err
      res.redirect('/login?new=true');
    })
  });
});


router.get('/encrypt', function(req, res, next) {
  res.render('encrypt');
});


router.post("/decrypt", function(req, res) {
	var array = req.body.mySTL;
    var iv = crypto.randomBytes(16);
    var decipher = crypto.createDecipheriv('aes-256-cbc',key, iv);
    var dec = decipher.update(array, 'base64', 'base64');
    dec += decipher.final('base64');
	res.json({ result: dec });
});


router.post("/encrypt", async function(req, res) {
  const absolutePath = path.join(__dirname, '../'+req.file.path);
  const non64array = fs.readFileSync(absolutePath);
	//const array = btoa(non64array);
  const array = non64array.toString('base64');
  //var array = req.body.mySTL;
  var iv = crypto.randomBytes(16);
  var cipher = crypto.createCipheriv('aes-256-cbc',key, iv);
  var crypted = cipher.update(array, 'base64', 'base64');
  crypted += cipher.final('base64');
  fs.writeFileSync(absolutePath, crypted);
  const sqlQuery = ``;
  connection.query('INSERT INTO Files  (fileName, UserID) VALUES ("'+path.parse(req.file.originalname).name+'", '+req.session.user+')', (err, rows, fields) => {
    if (err) throw err
  })
  res.download(absolutePath, filename=path.parse(req.file.originalname).name+'.leo');
});
*/

/* Routes /\ */

module.exports = router;
