import { gmail, auth } from '@googleapis/gmail';

import express from 'express';
import opn from 'open';
import { importGoogleCredentials } from './import-google-credentials';

(async () => {
  try {
    const googleCredentials = await importGoogleCredentials();

    //Here we create a new oauth2 client which will be used to identify the app
    const client = new auth.OAuth2(
      googleCredentials.clientId,
      googleCredentials.clientSecret,
      googleCredentials.oauthCallbackUrl
    );

    //This one sets the access type to offline meaning a refresh token can be generated when the client is offline
    const authorizeUrl = client.generateAuthUrl({
      access_type: 'offline',
      scope: googleCredentials.scopes,
    });

    const app = express();

    //This is the call back that will be called once the user grants the app access to the specified scoped
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

        //send appropriate messages to the screen
        res.send('Authentication successful! Please return to the console.');

        //close the server
        server.close();
      });

    });

    const server = app.listen(3000, () => {
      // open the browser to authorize url to start the workflow
      opn(authorizeUrl, {wait: false});
    });

  } catch (err) {
    console.log(err);
    // return;
  }
})()


