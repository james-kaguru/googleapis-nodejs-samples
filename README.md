# Googleapis Nodejs Samples
This repository is meant to provide comprehensive samples on googleapis. It mostly focuses on the workspace apis.

> The instructions already assume you already familiar with the GCP console. Also the authentication that is oath

[//]: # (> In the steps below we will be using gmail api.)

## To get started
1. Activate the googleapi that you want to use.
2. Create an oath consent screen
3. Create an oath 2.0 client screen
4. Download the credentials. It should look something like this

```json
{
  "installed":
  {
    "client_id":"<client-id>",
    "project_id":"<project-id>",
    "auth_uri":"https://accounts.google.com/o/oauth2/auth",
    "token_uri":"https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    "client_secret":"<client-secret>",
    "redirect_uris":["http://localhost"]
  }
}
```
5. Modify the json file to 

Want to collaborate?
Reach out on jimmykaguru@gmail.com