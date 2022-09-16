'use strict';

// [START main_body]
const {google} = require('googleapis');
const express = require('express');
const opn = require('open');
const path = require('path');
const fs = require('fs');

const keyfile = path.join(__dirname, 'gmail_credentials.json');
const keys = JSON.parse(fs.readFileSync(keyfile));
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

this.authorizeUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
});

const app = express();

app.get('/callback', (req, res) => {
    const code = req.query.code;
    client.getToken(code, async (err, tokens) => {
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

const tokens = {
    access_token: 'ya29.a0Aa4xrXMC1jMPCiLKEMU6rYi-hpquWzZcV40bFlDOS_WP1VsirPznfs7I-7MgJnOOgW9eOtkjr90rT8Tx6ojr-zybxYDJKfym1kNipSONl7IpTLPXtgERbYzwhuVOYncao-rwn_UVbR0W9dbYlYsnaTi43kfAaCgYKATASARESFQEjDvL9ya4LX2kupMrQxctsQaOPWA0163',
    refresh_token: '1//03sRyJKiaMOBuCgYIARAAGAMSNwF-L9IrEht48neiJ0k2ejKWbtoytnT_7TKDUefczibyUwLSwXub_bDrDSP1nUlFKe2FoKzBd6M',
    scope: 'https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.modify https://mail.google.com/',
    token_type: 'Bearer',
    expiry_date: 1663163169242
}


client.credentials = tokens;

const gmail = google.gmail({version:'v1',auth:client});

const run = async ()=> {
    try {
        const subject = '🤘 Hello 🤘';
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        const messageParts = [
            'From: Justin Beckwith <beckwith@google.com>',
            'To: Justin Beckwith <beckwith@google.com>',
            'Content-Type: text/html; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${utf8Subject}`,
            '',
            'This is a message just to say hello.',
            'So... <b>Hello!</b>  🤘❤️😎',
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
        return result;
    } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }
}

run().then()