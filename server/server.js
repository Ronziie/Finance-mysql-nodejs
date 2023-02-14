const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

//const bodyParser = require('body-parser'); //parse all the body.pars elements
//const cookieParser = require('cookie-parser'); //parse all the cookies
//const session = require('express-session'); //creating and maintaining session, remember sessions.

//const bcrypt = require('bcrypt'); 
//const saltRounds = 10;

const app = express();

app.use(express.json());

app.use(cors());

//app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: true }));

/*app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expire: 60 * 60 * 24,
    } // cookie that expires in 24 hours logs users off after.

}))*/

//creating connection with mysql database
const db = mysql.createConnection({
    user: "root",
    host: "localhost", 
    password: "password",
    database: "LoginSystem"
});

app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password

        db.query("INSERT INTO user (username, password) VALUES (?,?)",
        [username, password]),
        (err, result) => {
            console.log(err);
        } 

    }); 
    

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    
    db.query('SELECT * FROM user WHERE username = ? AND password = ?',
    [username, password],
    (err, result) => {
        if (err) {
            res.send({error: err});
        };

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({message: "Username/Password combination inaccurate!"})
        }
    
    });
    
}); 

app.post('/incomeData', (req, res) => {
    const incomeName = req.body.incomeName
    const incomeAmount = req.body.incomeAmount

    db.query("INSERT INTO income (incomeName, incomeAmount) VALUES (?,?)",
    [incomeName, incomeAmount]),
    (err, result) => {
        console.log(err);
        console.log(result);
    }
})
app.post('/expenseData', (req, res) => {
    const expenseName = req.body.expenseName
    const expenseAmount = req.body.expenseAmount

    db.query("INSERT INTO expense (expenseName, expenseAmount) VALUES (?, ?)",
    [expenseName, expenseAmount],
    (err, result) => {
        console.log(err);
        console.log(result);
    })

})

/*app.get('/getIncome', (req, res) => {
    db.query('SELECT * FROM loginsystem.income', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
}) */

//NEXT TASK IS TO ALLOW TO DELETE AND AMEND DETAILS FRONT END TO DATABASE 
//
//onclick delete, deletes from db && edit
//THEN PULLS DATA from database and shows on screen instead of local storage
//



//Creating the LoginSystem database 
//REMEMBER ON SQL WORKBENCH TO ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
//THEN TO flush priviledges

/*db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    db.query("CREATE DATABASE LoginSystem", function(err, result) {
        if (err) throw err;
        console.log("Database created");
    });
}); */

//selecting the port to listen on
app.listen('3001', () => {
    console.log('server started on port 3001');
})

//cd C:\Program Files\MySQL\MySQL Server 8.0\bin
//starting mysql server cmd line = mysql -uroot -p  
