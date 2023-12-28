// const express = require('express')
import bodyParser from "body-parser"
import  express  from "express"
import pg from 'pg'
import 'dotenv/config'
const app = express()


const db=new pg.Client({
  user:'postgres',
  host:'localhost',
  database:'formdata',
  password:'123456',
  port:5432
})
 

// const API_KEY = "";
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

 
app.get('/', function (req, res) {
  res.render('createAcc.ejs')
})

app.post('/create', async function (req, res) {
    try{
        const client = await db.connect();
    }catch(err){
        console.error("errore found "+err.message);
    }
    try {
      const userExists = await db.query('SELECT * FROM userdata2 WHERE fullname = $1', [req.body.name]);
      if (userExists.rows.length) {
        // res.status(409).send('Username already exists');
        // console.log('something new'+userExists);
        res.render('create-acc.ejs',{
          error:"user already exists"
        })
        res.redirect('create-acc.ejs')
      }else{

        const query = await db.query("insert into userdata2(fullname,email,password) values($1,$2,$3)",[req.body.name,req.body.email,req.body.password])
      }
    }catch(err){
        console.error("errore found "+err.message);
    }
    console.log('data is '+req.body['formSignUpPassword']);
    res.send('data submitted success name  email and password  is '+req.body.name+req.body.email+req.body.password)
  })

app.listen(3000)
console.log('server started lis\n http://localhost:3000');