import fs from 'fs';
import { plainToClass } from 'class-transformer';
import { GoogleCredentials } from '../common/classes/google-credentials';
import { validate } from 'class-validator';

export const importGoogleCredentials  =  async () => {
  const jsonString = fs.readFileSync("googleapi-credentials.json");
  const googleCredentialsObj = JSON.parse(jsonString.toString());

  const googleCredentials = plainToClass(GoogleCredentials, googleCredentialsObj)
  const errors = await validate(googleCredentials, {
    forbidNonWhitelisted: true,
    enableDebugMessages: true,
    whitelist: true,
    forbidUnknownValues: true,
    validationError: {
      target: false,
    }
  });

  if (errors.length > 0)
    throw new Error(errors[0].toString(true));

  return googleCredentials
}