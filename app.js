const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
require('dotenv').config();
const cors = require('cors');
const { MailtrapClient } = require('mailtrap');
const _log = console.log;
const TOKEN = process.env.TOKEN;
const ENDPOINT = process.env.ENDPOINT;

function sendEmail(req){
  const MAILBODY = `${new Date()}\nName: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}\n\nDescription:${req.body.description}`
  const client = new MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN
  });

  if (String(req.body.destination) == 'tabgs') _log('tabgs comparison successfull');
  else if (String(req.body.destination) == 'paul') _log ('paul comparison successfull');
  else _log('!Test failed.')

  const sender = {
    email: "noreply@paulbanks.info",
    name: "Paul Banks"
  };
  const RECV = String(req.body.destination) == 'tabgs'? process.env.RECV2 : process.env.RECV;
  const recipients = [
    { email: RECV }
  ];

client.send({
  from: sender,
  to: recipients,
  subject: "Service Request",
  text: MAILBODY,
  category: "Service Request"
}).then(console.log, console.error);

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