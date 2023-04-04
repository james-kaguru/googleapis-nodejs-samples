import { importGoogleCredentials } from '../auth/import-google-credentials';
import { sheets, auth } from '@googleapis/sheets';

(async () => {

  try {
    const googleCredentials = await importGoogleCredentials();

    const client = new auth.OAuth2(
      googleCredentials.clientId,
      googleCredentials.clientSecret,
    )

    client.setCredentials({
      refresh_token: googleCredentials.refreshToken
    });

    const sheetsService = sheets({version:'v4',auth: client});

    const spreadsheetId = "1KXOjycj9l76aao-CPIqs6xUefOl5zCe2l4QAC9_Kl2g"

    const range = 'products';

    const values = [
      [
        "Bankai"
      ],
       [
         "senbozakuron","Kageyoshi"
       ]
    ];


    const result = await sheetsService.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values
      }
    })

    console.log('%d cells updated.', result.data.updatedCells);
    return result;

  } catch (e) {
    console.log(e)
  }

})()