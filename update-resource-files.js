// docs here:
// http://docs.apigee.com/management/apis/put/organizations/%7Borg_name%7D/apis/%7Bapi_name%7D/revisions/%7Brevision_number%7D/resourcefiles/%7Bresource_type%7D/%7Bresource_name%7D-0

const request = require('request-promise')
const fs = require('fs')

require('dotenv').config();

const apiName    = process.env.APINAME
const apiOrg     = process.env.APIORG
const apiRev     = process.env.APIREV
const apigeeUser = process.env.APIGEE_USER
const apigeePass = process.env.APIGEE_PASS
const url        = `https://api.enterprise.apigee.com/v1/o/${apiOrg}/apis/${apiName}/revisions/${apiRev}/resourcefiles/jsc`

module.exports = (function( path , file ) {

    var fileToSend = fs.createReadStream(`${path}/${file}`)

    const options = {
        url: `${url}/${file}`,
        method: 'PUT',
        headers: {
            'content-type': 'multipart/form-data'
        },
        auth : {
            user: apigeeUser,
            password: apigeePass
        },
        formData: {
            "": fileToSend
        },
        resolveWithFullResponse: true
    };

    request(options)
        .then(function ( res ) {
            console.log("body", res.body)
            console.log("statusCode", res.statusCode)
            if (res.statusCode === 200)
                console.log("Resource updated on Apigee")
        })
        .catch(function ( err ) {
            console.log("status code error:", err.statusCode)
        });

})