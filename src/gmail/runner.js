const {google} = require("googleapis");
const path = require("path");
const fs = require("fs");

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


client.setCredentials({
    refresh_token: `1//03sRyJKiaMOBuCgYIARAAGAMSNwF-L9IrEht48neiJ0k2ejKWbtoytnT_7TKDUefczibyUwLSwXub_bDrDSP1nUlFKe2FoKzBd6M`
});

const gmail = google.gmail({version:'v1',auth:client});

const run = async ()=> {
    try {
        const subject = '🤘 Hello 🤘';
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        const messageParts = [
            'From: Justin Beckwith <jimmykaguru@gmail.com>',
            'To: Justin Beckwith <jimmykaguru@gmail.com>',
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
    } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }
}

run().then