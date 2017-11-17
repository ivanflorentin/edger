/*
there is no documentation on this feature on Apigee documentation
*/

const request = require('request')
const fs = require('fs')
const log = console.log.bind(console)

module.exports = (config, path, file) => {
    const {
        api_organization,
        api_name,
        api_revision,
        apigee_username,
        apigee_password
    } = config

    const url = `https://api.enterprise.apigee.com/v1/organizations/${api_organization}/apis/${api_name}/revisions/${api_revision}/policies`

    // policies names have to follow apigee standard, CamelCase

    fs.readFile(`${path}/${file}.xml`, function (err, data) {
        try {
            var body = data.toString()

            log("\n===================================================================================")
            log('xml string to send')
            log("===================================================================================\n")
            log(body)

        } catch (e) {
            console.error('error from readFile:', e)
        }

        let options = {
            method: 'PUT',
            url: `${url}/${file}`,
            auth: {
                user: apigee_username,
                password: apigee_password
            },
            headers: {
                'content-type': 'application/xml'
            },
            body: body
        }

        request(options, function (error, response, body) {

            if (error) console.log(error)

            if (response.statusCode === 200) {
                log("\n===================================================================================")
                log('Policy updated on Apigee')
                log("===================================================================================\n")
                log(body)
            } else {
                log('status code', response.statusCode)
            }

        })
    })
}