import {google} from 'googleapis';
import express from 'express';
import opn from 'open';
import path from 'path';
import fs from 'fs';

const keyfile = path.join(__dirname, '../gmail_credentials.json');
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

const gmail = google.gmail('v1');

// @ts-ignore
this.authorizeUrl = client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

const tokens = {
  access_token: 'ya29.A0AVA9y1taTjensFtiKyV1f9EujmCh7PJtNqGlj1JFpK1xVZHEeRL9wadpTHl1CbofCs2wsaVnGAJrOZlut2ok-KkWKLOoVC2jvFPq_BHYDrW6NMzo4cUToHU_d7YFEbrCkZxwti6Lo3vJBJAnP7mmTY5velqYaCgYKATASATASFQE65dr8GZa-SLRY52Z99OamcZIAZg0163',
  refresh_token: '1//03oPY1ohGmJnGCgYIARAAGAMSNwF-L9Ir1j2l5BUDcpnGALhv5ASHmSEg_MjZik3Fa3xA40sge6RCDo8RxRFnuzSNUOrpu83dU3M',
  scope: 'https://www.googleapis.com/auth/spreadsheets',
  token_type: 'Bearer',
  expiry_date: 1660325271016
}

client.credentials = tokens;

const sheets = google.sheets({version:'v4',auth:client});


sheets.spreadsheets.values.get(
  {
    spreadsheetId: '1zlcWOccErYAsCbCVoBzqK4j2CdNyyOwFiqIS52GXN5o',
    range: 'sheet1!A2:C10',
  },
  (err, res) => {
    if (err) {
      console.error('The API returned an error.');
      throw err;
    }
    const rows = res?.data.values;
    if (rows!.length === 0) {
      console.log('No data found.');
    } else {
      console.log('Name, Major:');
      for (const row of rows!) {
        // Print columns A and E, which correspond to indices 0 and 4.
        console.log(`${row[0]}, ${row[4]}`);
      }
    }
  }
);

const run = async ()=> {
  let values = [
    [
      "jimmy","las noches"
    ],
    // Additional rows ...
  ];
  const resource = {
    values,
  };
  try {
    // const result = await sheets.spreadsheets.values.update({
    //   spreadsheetId,
    //   range,
    //   valueInputOption,
    //   resource,
    // });
    // @ts-ignore
    const result = await sheets.spreadsheets.values.update({
      spreadsheetId:"1zlcWOccErYAsCbCVoBzqK4j2CdNyyOwFiqIS52GXN5o",
      range:"sheet1!A2:C10",
      valueInputOption:"raw",
      resource,
    });
    console.log('%d cells updated.', result);
    return result;
  } catch (err) {
    // TODO (Developer) - Handle exception
    throw err;
  }
}
// run().then(() => {console.log("done")})