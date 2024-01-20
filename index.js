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
  res.render('validation.ejs')
})

app.get('/sign-up', function (req, res) {
  res.render('sign-up.ejs')
})

app.post('/sign-up', function (req, res) {
  res.render('sign-up.ejs')
})


// app.post('/submit-form', function (req, res) {
//   const id = req.body['formSignUpPassword']
//   console.log('id is '+ id);
//   res.send('data is '+id)
// })


 
app.get('/plans', function (req, res) {
  res.render('plans.ejs')
})
app.get('/create', function (req, res) {
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
     
      res.render('create-acc.ejs',{
        error:"user already exists"
      })
  
    }else{

      const query = await db.query("insert into userdata2(fullname,email,password) values($1,$2,$3)",[req.body.name,req.body.email,req.body.password])
    }
  }catch(err){
      console.error("errore found "+err.message);
  }finally{
    await db.end();
    // res.redirect('create-acc.ejs')
  }
  console.log('data is '+req.body['formSignUpPassword']);
  res.send('data submitted success name  email and password  is '+req.body.name+req.body.email+req.body.password)
})


app.get('/FAQ', function (req, res) {
    res.render('FAQ.ejs')
  })
 
app.post('/validation', function (req, res) {
    
    const api_key ="2003";
    if(api_key===req.body.search){
      res.render('index.ejs')
    }
    else{
      res.render('validation.ejs',{
        error:"please provide the valid API key"
      })
    }
      
  })
  
  
    

 
app.post("/submit", async (req, res) => {
 
  
const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GPT_API}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.search }],
        max_tokens: 500, // length of req message
      }),
    };
  
    try {

        
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        config
      );
      const data = await response.json();
      const gpt_response = data.choices[0].message.content;
      // res.send(data.choices[0].message.content);
      res.render('index.ejs',{
        data:gpt_response
      })
    }
  catch(err){
res.send('errore fond')
  }


})
     
 
  
  
app.listen(3001)
console.log('server started lis\n http://localhost:3000');
