require('dotenv').config();

module.exports = {
    // env variables here
    "APINAME"     : null || process.env.APINAME,
    "APIORG"      : null || process.env.APIORG,
    "APIREV"      : null || process.env.APIREV,
    "APIGEE_USER" : null || process.env.APIGEE_USER,
    "APIGEE_PASS" : null || process.env.APIGEE_PASS
}