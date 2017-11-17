// docs here
// https://docs.apigee.com/management/apis/post/organizations/%7Borg_name%7D/apis/%7Bapi_name%7D/revisions/%7Brevision_number%7D-0

const fs = require('fs')
const request = require("request")
const archiver = require('archiver')
const log = console.log.bind(console)
const colors = require('colors/safe')

colors.setTheme({
    verbose : 'cyan',
    info    : 'green',
    error   : 'red',
    warn    : 'yellow'
})

const cleanDir = function(fileToDelete) {
    fs.unlink(fileToDelete, function(error) {
        if (error) {
            log(colors.error("Error: ",error))
        } else {
            log(colors.warn("\n==================================================================================="))
            log(colors.warn("cleaning directory..."))
            log(colors.warn("===================================================================================\n"))
        }
    })
}

const exportZipFile = function (folderToZip, config) {

    const {
        api_organization,
        api_name,
        api_revision,
        apigee_username,
        apigee_password
    } = config

    let fileToSend = fs.createReadStream(folderToZip + '/bundle.zip')

    let options = {
        method: 'POST',
        url: `https://api.enterprise.apigee.com/v1/organizations/${api_organization}/apis/${api_name}/revisions/${api_revision}`,
        auth: {
            user: apigee_username,
            password: apigee_password
        },
        headers: {
            'content-type': 'multipart/form-data'
        },
        formData: {
            file: fileToSend
        }
    }

    request(options, function (error, response, body) {
        if (error) log(colors.error("error: %s"), error)
        
        
        if (response.statusCode == 200) {
            log(colors.info("\n==================================================================================="))
            log(colors.info("Exported Succesfully"))
            log(colors.info("===================================================================================\n"))
            log(colors.verbose("Status: %s OK"), response.statusCode)
            log(colors.verbose(body))
        } else {
            log(colors.error("Status: %s"), response.statusCode)
            log(colors.error(body))
        }
        cleanDir(folderToZip + '/bundle.zip')
    })
}

const streamZipFile = function (config, folderToZip) {

    let output = fs.createWriteStream(folderToZip + '/bundle.zip')
    let archive = archiver('zip')

    output.on('close', function () {
        log(colors.warn("\n==================================================================================="))
        log(colors.warn("bundle is ready to be exported"))
        log(colors.warn("===================================================================================\n"))

        log(colors.verbose(archive.pointer() + ' total bytes zipped'))

        log(colors.warn("\n==================================================================================="))
        log(colors.warn("export bundle to APIGEE begins..."))
        log(colors.warn("===================================================================================\n"))

        exportZipFile(folderToZip, config)
    })

    archive.on('error', function (err) {
        log(err)
    })

    archive.pipe(output)

    let directory = folderToZip

    archive
        .directory(directory, 'apiproxy')
        .finalize()
}

module.exports = streamZipFile
