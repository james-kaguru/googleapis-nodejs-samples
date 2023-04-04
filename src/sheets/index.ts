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

    const sheetsClient = sheets({version:'v4',auth: client});
    const res = await sheetsClient.spreadsheets.create({})
    console.log(res.data)
  } catch (e) {
    console.log(e)
  }

})()