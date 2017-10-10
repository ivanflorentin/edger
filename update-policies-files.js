// docs:
// 404 Not Found

var request = require("request");
var fs = require("fs")

require('dotenv').config();

const apiName    = process.env.APINAME
const apiOrg     = process.env.APIORG
const apiRev     = process.env.APIREV
const apigeeUser = process.env.APIGEE_USER
const apigeePass = process.env.APIGEE_PASS
const url        = `https://api.enterprise.apigee.com/v1/organizations/${apiOrg}/apis/${apiName}/revisions/${apiRev}/policies`

module.exports = (function( dir, file ) {

    console.log("dir", dir)
    console.log("file", `${file}.xml`)

    var path = dir || __dirname
    fs.readFile(`${path}/${file}.xml`, function( err, data ) { 
        
        var body = data.toString()
        console.log("xml string to send", body)
        
        var options = { 
            method: 'PUT',
            url: `${url}/${file}`,
            auth : {
                user: apigeeUser,
                password: apigeePass
            },
            headers: { 
                'content-type': 'application/xml',
                body: body
            }
        }
        
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
      
            console.log(body);
        });
    })
})