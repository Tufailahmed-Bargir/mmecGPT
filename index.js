// const express = require('express')
// import bodyParser from "body-parser"
// import  express  from "express"
// import pg from 'pg'
const express = require('express')
// const express = require('e')
// import 'dotenv/config'
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express()


// const db=new pg.Client({
//   user:'postgres',
//   host:'localhost',
//   database:'formdata',
//   password:'123456',
//   port:5432
// })
 

// const API_KEY = "";
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

 
app.get('/', function (req, res) {
  res.render('index.ejs')
})

app.get('/sign-up', function (req, res) {
  res.render('sign-up.ejs')
})

app.post('/sign-up', function (req, res) {
  res.render('sign-up.ejs')
})


 


 
app.get('/plans', function (req, res) {
  res.render('plans.ejs')
})
app.get('/create', function (req, res) {
  res.render('createAcc.ejs')
})

// app.post('/create', async function (req, res) {
//   try{
//       const client = await db.connect();
//   }catch(err){
//       console.error("errore found "+err.message);
//   }
//   try {
//     const userExists = await db.query('SELECT * FROM userdata2 WHERE fullname = $1', [req.body.name]);
//     if (userExists.rows.length) {
     
//       res.render('create-acc.ejs',{
//         error:"user already exists"
//       })
  
//     }else{

//       const query = await db.query("insert into userdata2(fullname,email,password) values($1,$2,$3)",[req.body.name,req.body.email,req.body.password])
//     }
//   }catch(err){
//       console.error("errore found "+err.message);
//   }finally{
//     await db.end();
//     // res.redirect('create-acc.ejs')
//   }
//   console.log('data is '+req.body['formSignUpPassword']);
//   res.send('data submitted success name  email and password  is '+req.body.name+req.body.email+req.body.password)
// })


app.get('/FAQ', function (req, res) {
    res.render('FAQ.ejs')
  })
 
// app.post('/validation', function (req, res) {
    
//     const api_key ="2003";
//     if(api_key===req.body.search){
//       res.render('index.ejs')
//     }
//     else{
//       res.render('validation.ejs',{
//         error:"please provide the valid API key"
//       })
//     }
      
//   })
  
  
    

 
app.post("/submit", async (req, res) => {
 
  
 
  try {
    const query = req.body.search;
    
    // const query = `convert this legacy code {${inputCode}} written in {${type1}} to modern {${type2}}`
    // const queryCode = `act as the legacy code converter and convert this legacy code {${inputCode}} written in {${type1}} to modern {${type2}} code. NOTE: don't include comments and also don't mention the language you are converting `;

 
    const API_KEY ='AIzaSyCeGzZmKaRE5p5LuhatyKTP7z42gSHTt54';
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const generationConfig = {
        temperature: 1,
        topK: 0,
        topP: 0.95,
        maxOutputTokens: 8192,
    };

    const chat = model.startChat({
        generationConfig,
        history: [],
    });

    
    const resultCode = await chat.sendMessage(query);
    const convertedCode = resultCode.response.text();
    
      
    
    console.log('query');
    console.log(convertedCode);
 
      
    
    
    
    res.render('index.ejs',{
        data: convertedCode,
        
    });
} catch (error) {
    console.error('Error:', error.message);
}
});
     
 
  
  
app.listen(3001)
console.log('server started lis\n http://localhost:3000');
