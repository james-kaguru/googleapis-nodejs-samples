import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

require('dotenv').config({path: '../../../.env' })

const keyfile = path.join(__dirname, '../../../googleapi-oauth-credentials.json');
const keys = JSON.parse(fs.readFileSync(keyfile).toString());
const scopes = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send'
];


const client = new google.auth.OAuth2(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0]
);

client.setCredentials({
  refresh_token: process.env.GOOGLEAPI_REFRESH_TOKEN
});

const gmail = google.gmail({version:'v1',auth:client});

const run = async ()=> {
  let ejs = require('ejs');
  let users = ['geddy', 'neil', 'alex'];

  const path = require('path')
  const filename = path.join(__dirname,'../../views/sample-mail.ejs')

  const data = await ejs.renderFile(filename, {users: users})
  console.log(data)


  try {
    const subject = '🤘 Hello 🤘';
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
      `From: Justin Beckwith <${process.env.GMAIL_SENDER}>`,
      `To: Justin Beckwith <${process.env.GMAIL_RECIPIENT}>`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      '',
      'This is a message just to say hello.',
      `${data}`,
    ];
    const message = messageParts.join('\n');

    // The body needs to be base64url encoded.
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log(res.data);
  } catch (err) {
    // TODO (Developer) - Handle exception
    throw err;
  }
}

run().then()



