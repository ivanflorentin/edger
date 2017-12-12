/*
there is no documentation on this feature on Apigee documentation
*/

const request = require('request')
const fs = require('fs')
const log = console.log.bind(console)
const colors = require('colors/safe')

colors.setTheme({
    verbose : 'cyan',
    info    : 'green',
    error   : 'red',
    warn    : 'yellow'
})

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

            log(colors.warn("\n==================================================================================="))
            log(colors.warn("prepare xml string to send..."))
            log(colors.warn("===================================================================================\n"))
            //log(colors.warn(body))

        } catch (e) {
            log(colors.error('error from readFile: %s'), e)
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

            if (error) log(colors.error(error))

            if (response.statusCode === 200) {
                log(colors.info("\n==================================================================================="))
                log(colors.info("Policy updated on Apigee"))
                log(colors.info("===================================================================================\n"))
                log(colors.verbose("Status: %s OK"), response.statusCode)
                log(colors.verbose(body))
            } else {
                log(colors.error('Status: %s\n'), response.statusCode)
            }

        })
    })
}
