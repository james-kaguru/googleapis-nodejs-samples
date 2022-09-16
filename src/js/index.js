// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START main_body]
const {google} = require('googleapis');
const express = require('express');
const opn = require('open');
const path = require('path');
const fs = require('fs');

const keyfile = path.join(__dirname, 'credentials.json');
const keys = JSON.parse(fs.readFileSync(keyfile));
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

const client = new google.auth.OAuth2(
    keys.web.client_id,
    keys.web.client_secret,
    keys.web.redirect_uris[0]
);

this.authorizeUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
});

const app = express();

app.get('/oauth2callback', (req, res) => {
    const code = req.query.code;
    client.getToken(code, (err, tokens) => {
        if (err) {
            console.error('Error getting oAuth tokens:');
            throw err;
        }
        client.credentials = tokens;
        console.log(tokens)
        res.send('Authentication successful! Please return to the console.');
        server.close();
        // listMajors(client);
    });

});

const server = app.listen(3000, () => {
    // open the browser to the authorize url to start the workflow
    opn(this.authorizeUrl, {wait: false});
});

