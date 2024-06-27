const express = require('express');
require('dotenv').config();
const cors = require('cors');
const nodemailer = require('nodemailer');
const _log = console.log;



function getMailer(){
  return nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: false,
    auth: {
      user: process.env.UNAME,
      pass: process.env.PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });    
}

function sendEmail(req){
  const transporter = getMailer();
  const mailOptions = {
    // from: req.body.email,
    from: 'paul@email.com',
    to: 'mathewp9876@protonmail.com',
    text: `name: ${req.body.name}\nphone: ${req.body.phone}\nemail: ${req.body.email}\n\ndescription: ${req.body.description}`

  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      _log(`error: ${err}`);
    } else {
      _log(`email sent: ${info.response}`);
    }
  })
} 



const app = express();
app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  sendEmail(req);
  res.send();
});

app.listen(process.env.HOSTPORT, (err) => {
  if (!err) _log(`Listening at ${process.env.HOSTPORT}`);
  else _log(`Well sheeiiiiiiiitt\n, ${error}`)
});