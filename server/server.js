const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User= require('./model/dataSchema');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path :'./config.env'});

app.use(express.json());
// app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors());

mongoose.connect('mongodb+srv://lingagranites:lingadevi%402017@lingagranites.padzhqc.mongodb.net/lingagranites', { useNewUrlParser: true, useUnifiedTopology: true})
// mongoose.connect(process.env.LOC_STR, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Connected to Database'))
.catch((er)=>console.log("connection error"+" => "+er));

// try{
//     const conn = await mongoose.connect(process.env.LOC_STR,{
//         //must add in order to not get any error masseges:
//         useUnifiedTopology:true,
//         useNewUrlParser: true,
//         useCreateIndex: true
//     })
//     console.log(`mongo database is connected!!! ${conn.connection.host} `)
// }catch(error){
//     console.error(`Error: ${error} `)
//     process.exit(1) //passing 1 - will exit the proccess with error
// }


app.post('/', async(req, res) => {
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

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get("*/",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../client/build/index.html"));
    });
}

const port = process.env.Port || 8000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
