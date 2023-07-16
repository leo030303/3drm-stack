var express = require('express');
const mysql = require('mysql2');


var router = express.Router();
var crypto = require('crypto');
var fs = require('fs');
const path = require("path");
const multer  = require('multer');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");



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



const saltRounds = 10;


const connection = mysql.createPool({
  host: 'mysql_db',
  user: '3DRMadmin',
  password: 'test',
  database: '3drmDB'
})





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


/*
// dummy database

var users = {
  tj: { name: 'tj' }
};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  users.tj.hash = hash;
});*/

/**
 *  This function is used verify a google account
 */
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

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
      connection.query('INSERT INTO Users  (firstName, lastName, email) VALUES ("'+profile?.given_name+'", "'+profile?.family_name+'", "'+profile?.email+'") ON DUPLICATE KEY UPDATE email=email;', (err, rows, fields) => {
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

function checkForUser(profile, callback){
  connection.query('SELECT COUNT(1) AS myCount FROM Users WHERE email = "'+profile?.email+'";', (err, result) => {
    if (err) throw err
    console.log(result);
    return callback(result[0].myCount);
  })

}

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
              expiresIn: "1d",
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



// will keep this in case i implement non google login later

// need sql query sanitisation

/*function authenticate(name, pass, fn) {
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


var keyText = "";
try {  
    keyText = fs.readFileSync(path.resolve(__dirname, '../public/others/keyFile.txt'), 'utf8');   
    keyText = keyText.replace(/[\n\r]/g, '');
} catch(e) {
    console.log('Error:', e.stack);
}

const key = crypto.createSecretKey(keyText);

router.post('/plugin', function(req, res) {
  const absolutePath = path.join(__dirname, '../public/others/3DRM1.0.0-sdk8.0.0.curapackage');
  res.download(absolutePath);
});




router.get('/yourFiles', async function(req, res) {
  var whereQuery = "";
  const fileKeys = ["FileID", "filename", "fileDescription", "filePrice", "ownerEmail"];
  if(fileKeys.includes(req.query.searchField)){
    whereQuery = 'WHERE '+req.query.searchField+'="'+req.query.fieldVal+'"';
  }
  connection.query('SELECT FileID, filename, fileDescription, filePrice, filePictureRoute FROM Files '+whereQuery, (err, rows, fields) => {
    if (err) throw err
    res.send({entryData: rows});
  })
}); 

router.post('/grantAccess', authenticateToken, function(req, res) {
  const numberOfDays = 3;
  const tempDate = new Date(Date.now() + numberOfDays * 1000 * 86400);
  const insertDate = `${tempDate.getFullYear()}-${tempDate.getMonth()}-${tempDate.getDay()}`;
  connection.query('INSERT INTO UserPrivileges (ownerEmail, FileID, expiryDate) VALUES ("'+req.body.email+'", '+req.body.FileID+', "'+insertDate+'")', (err, rows, fields) => {
    if (err) throw err
    res.sendStatus(200);
  })
});


var formUpload = upload.fields([{ name: 'listingImage', maxCount: 1 }, { name: 'listingSTL', maxCount: 1 }]);
router.post('/uploadFile', authenticateToken, formUpload, async function(req, res) {
  var picturePath = req.files.listingImage[0].path;
  picturePath = picturePath.slice(picturePath.indexOf("/", 1))
  var filePath = req.files.listingSTL[0].path;
  connection.query('INSERT INTO Files (filename, fileDescription, filePrice, filePictureRoute, fileRoute, ownerEmail) VALUES ("'+req.body.listingName+'", "'+req.body.listingDescription+'", '+req.body.listingPrice+', "'+picturePath+'", "'+filePath+'", "'+req.body.email+'")', (err, result, fields) => {
    if (err) throw err
    res.redirect('/');
  })
});


router.get('/createUser', function(req, res, next) {
  res.render('createUser');
});
router.post('/createUser', function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
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
  connection.query('INSERT INTO Files  (filename, UserID) VALUES ("'+path.parse(req.file.originalname).name+'", '+req.session.user+')', (err, rows, fields) => {
    if (err) throw err
  })
  res.download(absolutePath, filename=path.parse(req.file.originalname).name+'.leo');
  //res.redirect("/");
});


module.exports = router;
