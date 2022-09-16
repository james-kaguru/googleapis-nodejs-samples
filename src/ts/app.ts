import {google} from 'googleapis';
import express from 'express';
import opn from 'open';
import path from 'path';
import fs from 'fs';

const keyfile = path.join(__dirname, '../credentials.json');
const keys = JSON.parse(fs.readFileSync(keyfile).toString());
const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly','https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send',];

const client = new google.auth.OAuth2(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0]
);

// @ts-ignore
this.authorizeUrl = client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});