import { gmail, auth } from '@googleapis/gmail';

import express from 'express';
import opn from 'open';
import * as dotenv from 'dotenv'
dotenv.config()

//Here the scopes of what the app will do is defined
//The example below shows gmail scopes
const scopes = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send'
];

//Here we create a new outh2 client which will be used to identify the app
const client = new auth.OAuth2(
  process.env.GOOGLEAPI_CLIENT_ID,
  process.env.GOOGLEAPI_SECRET,
  process.env.GOOGLEAPI_REDIRECT_URL
);

//this one sets the access type to offline meaning a refresh token can be generated when the client is offline
const authorizeUrl = client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

//EXPRESS SETUP
const app = express();

//This is the call back that will be called once the user grants the app access to
//the specified scoped
app.get('/callback', (req, res) => {
  const code = req.query.code as string;
  client.getToken(code, async (err, tokens) => {
    //throw error if any occurred
    if (err) {
      console.error('Error getting oAuth tokens:');
      throw err;
    }

    //log the tokens
    console.log(tokens)

    //send appropriate messsage to the screen
    res.send('Authentication successful! Please return to the console.');

    //close the server
    server.close();
  });

});

const server = app.listen(3000, () => {
  // open the browser to authorize url to start the workflow
  opn(authorizeUrl, {wait: false});
});