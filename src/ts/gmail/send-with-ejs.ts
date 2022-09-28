import { gmail, auth } from '@googleapis/gmail';
import path from 'path';
import ejs from 'ejs'
import * as dotenv from 'dotenv'
dotenv.config({path: '../../../.env' })

//Here we create a new outh2 client which will be used to identify the app
const client = new auth.OAuth2(
  process.env.GOOGLEAPI_CLIENT_ID,
  process.env.GOOGLEAPI_SECRET,
  process.env.GOOGLEAPI_REDIRECT_URL
)

client.setCredentials({
  refresh_token: process.env.GOOGLEAPI_REFRESH_TOKEN
});

const gmailClient = gmail({version:'v1',auth:client});

const run = async ()=> {
  let users = ['geddy', 'neil', 'alex'];

  const filename = path.join(__dirname,'../../views/welcome.ejs')

  const data = await ejs.renderFile(filename, {users: users, message: "hello dad", code: 123})
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

    const res = await gmailClient.users.messages.send({
      userId: 'dev@freshlybrewed.africa',
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



