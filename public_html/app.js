/* 
 * Student Info: Name=Pavanitha Kalyanam, ID=19361 
 * Subject: CS595(G)_GrabUrOffer_Spring_2017 
 * Author: KrishnaReddy 
 * Filename: app.js 
 * Date and Time: Feb 17, 2017 5:55:56 PM  
 * Project Name: GrabUrOfferProject 
 */
var express = require("express");
var mysql = require('mysql');
var bodyParser = require('body-parser');
var ejs = require('ejs');
//to send email to customers
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var router = express.Router();

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
var connection = mysql.createConnection(
        {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'graburoffer',
            port: 3306
        });
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... ");
    } else {
        console.log("Error connecting database ...");
    }
});
app.get('/', function (req, res) {
    res.send('Welcome to GrabUrOffers !!!');
});

app.get('/category', function (req, res) {
    var sql_query = "select * from category";
    connection.query(sql_query, function (err, rows, fields) {
        if (err) {
            console.log('Connection result error ' + err);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end({error: err});
            res.end();
        } else {
            console.log('no of categories is ' + rows.length);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(rows));
        }
    });
});
app.get('/offers', function (req, res) {
    var id = req.query.cat_id;
    console.log('id=' + id);
    var sql_query = "SELECT * FROM OFFER WHERE CAT_ID = ? AND STR_TO_DATE(END_DATE, '%m/%d/%Y')  > NOW()";
    connection.query(sql_query, id, function (err, rows, fields) {
        if (err) {
            console.log('Connection result error ' + err);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end({error: err});
            res.end();
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(rows));
            res.end();
        }
    });
});

app.post('/grabOffers', function (req, res) {
    console.log(req.body);      // your JSON
    loadUser(req, res);

});

function sendMail(user, options) {
    // Not the movie transporter!
    console.log('options object : ' + JSON.stringify(options));
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'graburlatestoffers@gmail.com', // Your email id
            pass: 'Offers@123' // Your password
        }
    });
    var toAddress = isEmpty(user.email) ? 'pavanin24@gmail.com' : user.email;
    var subject = ejs.render('Grab Your Offers <%= email %>', user);
    var text = ejs.render('Activate your account by clicking this link <%= alink %>', options);
    if (options.content) {
        text += '\n ' + JSON.stringify(options.content);
    }
    console.log('mail text : ' + text);

    var mailOptions = {
        from: 'Grab UrOffers <graburlatestoffers@gmail.com>', // sender address
        to: toAddress, // list of receivers
        subject: subject, // Subject line
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Message failed');
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}
function sendOfferMail(req, res, user, options) {
    // Not the movie transporter!
    console.log('options object : ' + JSON.stringify(options));
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'graburlatestoffers@gmail.com', // Your email id
            pass: 'Offers@123' // Your password
        }
    });
    var toAddress = isEmpty(user.email) ? 'pavanin24@gmail.com' : user.email;
    var subject = ejs.render('Your Shortlisted Offers List <%= username %>\n', user);
    var text = "";
    if (options.content) {
        text += '\n ' + JSON.stringify(options.content);
    }
    console.log('mail text : ' + text);

    var mailOptions = {
        from: 'Grab UrOffers <graburlatestoffers@gmail.com>', // sender address
        to: toAddress, // list of receivers
        subject: subject, // Subject line
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.end('error');
        } else {
            console.log('Message sent: ' + info.response);
            res.end('Sent');
            res.end();
        }
    });
}
app.listen(3333, function () {
    console.log('GrabUrOffer app listening on port 3333!');
});

app.get('/active', function (req, res) {
    console.log(req.query.hash);
    var hash = req.query.hash;
    var sql_query = "UPDATE USERS SET IS_ACTIVE=1 WHERE USER_HASH = ? ";
    connection.query(sql_query, hash, function (err, rows) {
        if (err) {
            console.log('Connection result error ' + err);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end({error: err});
        } else {
             var numRows = rows.affectedRows;
             console.log('numRows : '+numRows);
             var m1='Invalid confirmation link ...';
             var m2='Your account has been activated successfully... Please login to your account';
             res.writeHead(200, {'Content-Type': 'text/html'});
             if(numRows > 0){
                 console.log('Records updated : '+m2);
                 res.end(m2);
                 res.end();
             }else{
                 console.log('Recordsnot updated : '+m2);
                 res.end(m1);
                 res.end();
             }
        }
    });


});
app.post('/signup', function (req, res) {
    console.log(req.body);
    var user = req.body;
    console.log('params [' + params + ']');
    if (isEmpty(user.username) || isEmpty(user.password) || isEmpty(user.email) || isEmpty(user.confirmpassword)) {
         res.end({"status": "Error -  missing some input information", "message": "missing information"});
         res.end();
    } else {
        var hash = crypto.createHash('sha1').update(user.username + '_' + user.password, 'utf8').digest('hex');
        console.log('HashCode : ' + JSON.stringify(hash));
        var params = [user.username, user.username, user.password, user.email, hash];
        var sql_query = "INSERT INTO USERS (FULLNAME, USERNAME, PASSWORD, EMAIL ,USER_HASH,CREATED_ON) VALUES(?,?,?,?,?,NOW()) ";
        connection.query(sql_query, params, function (err, rows, fields) {
            if (err) {
                console.log('Connection result error ' + err);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end({error: err});
                res.end();
            } else {
                var numRows = rows.affectedRows;
                var sub = "Congratulations ... Please activate your account";
                var options = {};
                options.alink = 'http://localhost:3333/active?hash=' + hash;
                options.subject = sub;
                console.log('options : ' + JSON.stringify(options));
                sendMail(user, options);
                var response = {};
                    response.status = "Success -  registration successful";
                    response.message = "You will receive a activation link to your email..";
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(response));
                    res.end();
            }
        });

    }
});

app.post('/login', function (req, res) {
    console.log(req.body);
    var user = req.body;
    console.log('params [' + params + ']');
    if (isEmpty(user.username) || isEmpty(user.password)) {
        res.end({"status": "Error -  Login Failed", "message": "username or password is missing"});
        res.end();
    } else {
        var params = [user.username, user.password];
        var sql_query = "SELECT * FROM USERS WHERE USERNAME = ? AND PASSWORD = ? and IS_ACTIVE=1";
        connection.query(sql_query, params, function (err, rows) {
            if (err) {
                console.log('Connection result error ' + err);
                response.status = "Error -  Login Failed";
                response.message = "username or password is incorrect";
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(response));
                res.end();
            } else {
                console.log('rows: ' +rows.length);
                if (rows.length > 0) {
                    var response = {};
                    response.status = "success";
                    response.message = params[0]+" your login is successful...";
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(response));
                    res.end();
                }
            }
        });

    }
});

function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null)
        return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)
        return false;
    if (obj.length === 0)
        return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))
            ;
        return false;
    }
    return true;
}

function loadUser(req, res) {
    var id=req.query.userId!==null ? parseInt(req.query.userId) : 0;
    console.log('userId : '+id);
     var params = [id];
     connection.query('SELECT * FROM USERS WHERE ID=?', params, function (err, rows, fields) {
        if (err) {
            console.log('Connection result error ' + err);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end({error: err});
            res.end();
        } else {
            var user = {};
                console.log('on result: ' + JSON.stringify(rows));
                user.email = rows[0].EMAIL;
                user.username = rows[0].USERNAME;

                var sub = "Your Shortlisted offers ... ";
                var options = {};
                options.alink = '';
                options.subject = sub;
                options.content = req.body;
                sendOfferMail(req, res, user, options);
        }
    });
}


      