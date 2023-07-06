var express = require('express');
const mysql = require('mysql2');


var router = express.Router();
var crypto = require('crypto');
var fs = require('fs');
const path = require("path");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'foobar';



const connection = mysql.createPool({
  host: 'mysql_db',
  user: '3DRMadmin',
  password: 'test',
  database: '3drmDB'
})

//connection.connect()





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








// Authenticate using our plain-object database of doom!

// need sql query sanitisation


function authenticate(name, pass, fn) {
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
}



/*
function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  var user = users[name];
  // query the db for the given username
  if (!user) return fn(null, null)
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  bcrypt.compare(pass, user.hash, function(err, result) {
    console.log("apple  "+user.hash);
    if (err) return fn(err);
    if (result===true) return fn(null, user)
    fn(null, null)
  });
}*/

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}


router.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

router.get('/login', function(req, res){
  if(req.query.fail=='true'){
    res.render('login', {message:'Authentication failed, please check your '
    + ' username and password.'});
  } else if (req.query.new=='true'){
    res.render('login', {message:'Account created, please log in with your '
    + ' username and password.'});
  }
  else{
    res.render('login',{message:'Please enter your '
    + ' username and password.'});
  }
  
});

router.post('/login', function (req, res, next) {
  authenticate(req.body.username, req.body.password, function(err, user){
    if (err) return next(err)
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name;
        res.redirect('/');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('/login?fail=true');
    }
  });
});


var keyText = "";
try {  
    keyText = fs.readFileSync(path.resolve(__dirname, '../public/others/keyFile.txt'), 'utf8');   
    keyText = keyText.replace(/[\n\r]/g, '');
} catch(e) {
    console.log('Error:', e.stack);
}

const key = crypto.createSecretKey(keyText);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/help', function(req, res, next) {
  res.render('help');
});
router.get('/plugin', function(req, res, next) {
  res.render('plugin');
});
router.post('/plugin', function(req, res) {
  const absolutePath = path.join(__dirname, '../public/others/3DRM1.0.0-sdk8.0.0.curapackage');
  res.download(absolutePath);
});

router.get('/fileView', restrict, function(req, res, next) {
  connection.query('SELECT FileID, filename FROM Files WHERE UserID='+req.session.user, (err, rows, fields) => {
    if (err) throw err
    res.render('fileView', {entryData: rows});
  })
});

router.get('/grantAccess', restrict, function(req, res, next) {
  res.render('grantAccess');
});

router.post('/grantAccess', function(req, res) {
  req.body.userID
  connection.query('SELECT UserID FROM Files WHERE FileID='+req.body.fileID, (err, rows, fields) => {
    if (err) throw err
    if (rows[0].UserID!=req.session.user){
      console.log("thats not your file");
      res.redirect('/');
    }
  })
  connection.query('INSERT INTO UserPrivileges (UserID, FileID, expiryDate) VALUES ('+req.body.userID+', '+req.body.fileID+', "'+req.body.expiryDate+'")', (err, rows, fields) => {
    if (err) throw err
    res.redirect('/fileView');
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


router.get('/encrypt', restrict, function(req, res, next) {
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
router.post("/encrypt", upload.single('toEncryptFile'), async function(req, res) {
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
