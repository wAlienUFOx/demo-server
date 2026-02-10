const http = require('http');
const express = require('express');
const requestIp = require('request-ip');
const os = require('os');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

console.log(`env loaded: ${process.env.STARTED}`);

console.log('Запуск на компьютере:', os.hostname());

const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(requestIp.mw());

//fcm init
// var admin = require("firebase-admin");
// var serviceAccount = require("./myapp-12a12-firebase-adminsdk-bkhij-ac9e216a03.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

app.use((req, res, next) => {
  let ip = req.clientIp?.includes('::ffff:') ? req.clientIp.split('::ffff:')[1] : req.clientIp;
  console.log(`Request ${req.method} ${req.url} from ip: ${ip}`);
  if (req.url.startsWith('/login_select') || req.url.startsWith('/login_id')) { //registration or login
    next();
  } else {
    const jwtToken = req.header('Authorization');
    const privateKey = fs.readFileSync('private.key', 'utf8');
    jwt.verify(jwtToken, privateKey, (err) => {
      if (err) {
        console.error('Unauthorized request: 403');
        return res.status(403).json({ error: 'unathorized' });
      }
      next();
    });
  }
});