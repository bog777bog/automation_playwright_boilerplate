require('dotenv').config();

const demoBaseUrl = `https://www.saucedemo.com`;
const uatBaseUrl = `https://${process.env.ENV_USERNAME}:${process.env.ENV_PASSWORD}@uat.saucedemo.com`;
const prodBaseUrl = `https://${process.env.ENV_USERNAME}:${process.env.ENV_PASSWORD}@prod.saucedemo.com`;

let environmentType = process.env.ENVIRONMENT_TYPE;
let baseUrl: string;

if (environmentType == 'prod') {
  baseUrl = prodBaseUrl;
} else if (environmentType == 'demo') {
  baseUrl = demoBaseUrl;
}

export { baseUrl };
