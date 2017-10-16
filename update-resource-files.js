// docs here:
// http://docs.apigee.com/management/apis/put/organizations/%7Borg_name%7D/apis/%7Bapi_name%7D/revisions/%7Brevision_number%7D/resourcefiles/%7Bresource_type%7D/%7Bresource_name%7D-0

const request = require('request-promise')
const fs      = require('fs')
const config  = require("./config")

const API_NAME    = config.APINAME
const API_ORG     = config.APIORG
const API_REV     = config.APIREV
const APIGEE_USER = config.APIGEE_USER
const APIGEE_PASS = config.APIGEE_PASS

const url = `https://api.enterprise.apigee.com/v1/o/${API_ORG}/apis/${API_NAME}/revisions/${API_REV}/resourcefiles/jsc`

module.exports = (function( path , file ) {

    var fileToSend = fs.createReadStream(`${path}/${file}`)

    var options = {
        url                     : `${url}/${file}`,
        method                  : 'PUT',
        headers                 : { 'content-type': 'multipart/form-data' },
        auth                    : { user: APIGEE_USER, password: APIGEE_PASS },
        formData                : { "": fileToSend },
        resolveWithFullResponse : true
    }

    request(options)
        .then(function ( res ) {
            console.log("APIGEE RESPONSE BODY:\n", res.body)
            if (res.statusCode === 200)
                console.log("Resource updated on Apigee")
            else
                console.log("status code", res.statusCode)
        })
        .catch(function ( err ) {
            console.log("status code error:", err.statusCode)
        })

})
