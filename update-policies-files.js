// docs:
// 404 Not Found

const request = require("request");
const fs      = require("fs")
const config  = require("./config")

const API_NAME    = config.APINAME
const API_ORG     = config.APIORG
const API_REV     = config.APIREV
const APIGEE_USER = config.APIGEE_USER
const APIGEE_PASS = config.APIGEE_PASS

const url = `https://api.enterprise.apigee.com/v1/organizations/${API_ORG}/apis/${API_NAME}/revisions/${API_REV}/policies`

module.exports = (( path, file ) => {

    // apigee expect a lower case file name in policies
    var fileName = file.toLowerCase()

    fs.readFile(`${path}/${file}.xml`, function( err, data ) { 
        
        var body = data.toString()
        console.log("xml string to send", body)
        
        var options = { 
            method  : 'PUT',
            url     : `${url}/${fileName}`,
            auth    : { user: APIGEE_USER, password: APIGEE_PASS },
            headers : { 'content-type': 'application/xml' },
            body    : body
        }
        
        request(options, function (error, response, body) {
            if (error) throw new Error(error)
            
            console.log("APIGEE RESPONSE BODY:\n", body);
            
            if (response.statusCode === 200)
                console.log("Policy updated on Apigee")
            else
                console.log("status code", response.statusCode)
        })
    })
})