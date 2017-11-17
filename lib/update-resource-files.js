// docs here:
// http://docs.apigee.com/management/apis/put/organizations/%7Borg_name%7D/apis/%7Bapi_name%7D/revisions/%7Brevision_number%7D/resourcefiles/%7Bresource_type%7D/%7Bresource_name%7D-0

const request = require('request-promise')
const fs = require('fs')
const log = console.log.bind(console)

module.exports = function (config, path, file) {
    const {
        api_organization,
        api_name,
        api_revision,
        apigee_username,
        apigee_password
    } = config

    const url = `https://api.enterprise.apigee.com/v1/o/${api_organization}/apis/${api_name}/revisions/${api_revision}/resourcefiles/jsc`

    log("\n===================================================================================")
    log("Updating js file")
    log("===================================================================================\n")
    log(`${path}/${file}`)

    var fileToSend = fs.createReadStream(`${path}/${file}`)

    var options = {
        url: `${url}/${file}`,
        method: 'PUT',
        headers: {
            'content-type': 'multipart/form-data'
        },
        auth: {
            user: apigee_username,
            password: apigee_password
        },
        formData: {
            '': fileToSend
        },
        resolveWithFullResponse: true
    }

    request(options)
        .then(function (res) {
            if (res.statusCode === 200) {
                log("\n===================================================================================")
                log("Resource updated on Apigee")
                log("===================================================================================\n")
                log("\nstatus code:", res.statusCode)
                log(options.url)
            } else {
                log('status code', res.statusCode)
            }
        })
        .catch(function (err) {
            log('status code error:', err.statusCode)
        })
}