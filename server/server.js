const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User= require('./model/dataSchema');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv').config({path :'config.env'});

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://linga:I7LyK2vGU7Ew2bCj@linga.y32tmpd.mongodb.net/clientdata', { useNewUrlParser: true, useUnifiedTopology: true})
// mongoose.connect(process.env.DB_URI)
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
  
// const ipAddress = '0.0.0.0';

// const port = process.env.PORT || (process.env.NODE_ENV === 'production' ? 80 : 3000);

// const server = http.createServer(app);

// server.listen(port, ipAddress, () => {
//   console.log(`Server running on ${ipAddress}:${port}`);
// });


// const httpPort = 80; 
// const httpsPort = 443; // Default HTTPS port


// const httpServer = http.createServer(app);

// const keyFilePath = path.join(__dirname, 'private.key');
// const certFilePath = path.join(__dirname, 'certificate.crt');


// if (!fs.existsSync(keyFilePath) || !fs.existsSync(certFilePath)) {
//   console.error('ERROR: SSL certificate files not found.');
//   process.exit(1);
// }

// const options = {
//   key: fs.readFileSync(keyFilePath),
//   cert: fs.readFileSync(certFilePath),
// };

// const httpsServer = https.createServer(options, app);

// httpServer.listen(httpPort, () => {
//   console.log(`HTTP server listening on port ${httpPort}`);
// });

// httpsServer.listen(httpsPort, () => {
//   console.log(`HTTPS server listening on port ${httpsPort}`);
// });

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});