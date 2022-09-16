import { google } from 'googleapis';
import express from 'express';
import opn from 'open';
import path from 'path';
import fs from 'fs';

//parse the json into an object
const keyfile = path.join(__dirname, 'gmail_credentials.json');
const keys = JSON.parse(fs.readFileSync(keyfile).toString());

//this defines the scope pf permissions your app requires
const scopes = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send'
];

//set up a new client using the keys fetched from the json file
const client = new google.auth.OAuth2(
  keys.web.client_id,
  keys.web.client_secret,
  //ensure the redirect url in the json file is properly defined
  /** The redirect url is the route that will be called back and given the access code which will then
   * allow you to exchange the code for the tokens. Both the access token and the refresh token
  */
  keys.web.redirect_uris[0]
);

const authorizeUrl = client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});