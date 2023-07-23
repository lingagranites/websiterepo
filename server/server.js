const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User= require('./model/dataSchema');
const path = require('path');

const dotenv = require('dotenv').config({path :'config.env'});

app.use(express.json());
app.use(cors());

// mongoose.connect('mongodb+srv://lingagranites:lingadevi%402017@lingagranites.padzhqc.mongodb.net/lingagranites', { useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect(process.env.DB_URI)
.then(()=>console.log('Connected to Database'))
.catch((er)=>console.log("connection error"+" => "+er));


// app.get('/',(req,res)=>{
//     res.status(200).send('server side started')
// })

app.post('/insert', async(req, res) => {
    const name = req.body.name;
    const number = req.body.number;
    const email = req.body.email;
    const message = req.body.message;

    const formData = new User({
       name : name,
       number : number,
       email : email,
       message : message
    })

    try {
        await formData.save();
        res.send("inserted data..");
        console.log(formData)
    } catch(err) {
        console.log(err)
    }
});

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, '../client/build')));
//     app.get("*/",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,"../client/build/index.html"));
//     });
// }

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

function serveReactApp(req, res, next) {
    const clientAppPath = path.join(__dirname, '../client/build');
    const indexPath = path.resolve(__dirname, '../client/build/index.html');
  
    express.static(clientAppPath)(req, res, (err) => {
      if (err) {
        res.sendFile(indexPath);
      }
    });
  }

  app.use(serveReactApp);
  
