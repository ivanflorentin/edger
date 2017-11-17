// docs here:
// http://docs.apigee.com/management/apis/put/organizations/%7Borg_name%7D/apis/%7Bapi_name%7D/revisions/%7Brevision_number%7D/resourcefiles/%7Bresource_type%7D/%7Bresource_name%7D-0

const request = require('request-promise')
const fs = require('fs')
const log = console.log.bind(console)
const colors = require('colors/safe')

colors.setTheme({
    verbose : 'cyan',
    info    : 'green',
    error   : 'red',
    warn    : 'yellow'
})

module.exports = function (config, path, file) {
    const {
        api_organization,
        api_name,
        api_revision,
        apigee_username,
        apigee_password
    } = config

    const url = `https://api.enterprise.apigee.com/v1/o/${api_organization}/apis/${api_name}/revisions/${api_revision}/resourcefiles/jsc`

    log(colors.warn("\n==================================================================================="))
    log(colors.warn("Updating js file..."))
    log(colors.warn("===================================================================================\n"))
    log(colors.verbose(`${path}/${file}`))

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
                log(colors.info("\n==================================================================================="))
                log(colors.info("Resource updated on Apigee"))
                log(colors.info("===================================================================================\n"))
                log(colors.verbose("Status: %s OK"), res.statusCode)
                log(colors.verbose(res.body))
            } else {
                log(colors.error('Status %s'), res.statusCode)
            }
        })
        .catch(function (err) {
            log(colors.error('Status: %s'), err.statusCode)
        })
}