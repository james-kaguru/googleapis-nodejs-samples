import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class GoogleCredentials {
  @IsString()
  @IsNotEmpty()
  clientId : string;

  @IsString()
  @IsNotEmpty()
  clientSecret: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsString()
  @IsNotEmpty()
  oauthCallbackUrl: string;

  @IsArray()
  @IsNotEmpty()
  scopes: string[];
}