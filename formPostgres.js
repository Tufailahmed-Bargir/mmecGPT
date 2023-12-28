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
  res.render('sign-up.ejs')
})

app.post('/submit', async function (req, res) {
    try{
        const client = await db.connect();
    }catch(err){
        console.error("errore found "+err.message);
    }
    try{
        const query = await db.query("insert into userdata(email,password) values($1,$2)",[req.body.signinEmailInput,req.body.formSignUpPassword])
    }catch(err){
        console.error("errore found "+err.message);
    }
    console.log('data is '+req.body['formSignUpPassword']);
    res.send('data submitted success email and password  is '+req.body.signinEmailInput+req.body.formSignUpPassword)
  })

app.listen(3000)
console.log('server started lis\n http://localhost:3000');