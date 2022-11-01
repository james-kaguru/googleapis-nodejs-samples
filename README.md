# Googleapis Nodejs Samples
This repository is meant to provide comprehensive samples on googleapis. It mostly focuses on the workspace apis.

> The instructions already assume you already familiar with the GCP console. Also the authentication that is oath

[//]: # (> In the steps below we will be using gmail api.)

## Set 1: Get the access tokens
1. Activate the googleapi that you want to use.( e.g the gmail api or the email api)
2. Create an oath consent screen
3. Create an oath 2.0 client
4. Copy the oath 2.0 client credentials required which include the client id and client secret.
5. Populate the .env file with appropriate data as shown in the .env example


## Set 2: Utilise the token
1. Define the scopes of what your app wants to use.
2. Request for the authorisation code.
3. Exchange the code for the refresh token.
4. Store the refresh token after running start auth script.
5. Use the refresh token to send requests.


Want to collaborate?
Reach out on jimmykaguru@gmail.com