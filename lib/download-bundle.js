const fs = require("fs")
const request = require("request")
const unzip = require("unzip")
const log = console.log.bind(console)
const colors = require('colors/safe')
const EventEmitter = require('events')

class customEmitter extends EventEmitter {}
const observable = new customEmitter()

let output = 'bundle.zip'

colors.setTheme({
    verbose: 'cyan',
    info: 'green',
    error: 'red',
    warn: 'yellow'
})

const cleanDir = function (fileToDelete) {
    fs.unlink(fileToDelete, function (error) {
        if (error) {
            log(colors.error("Error: ", error))
        } else {
            log(colors.warn("\n==================================================================================="))
            log(colors.warn("cleaning directory..."))
            log(colors.warn("===================================================================================\n"))
        }
    })
}
const getOptions = config => {
    const {
        api_organization,
        api_name,
        api_revision,
        apigee_username,
        apigee_password
    } = config
    return {
        url: `https://api.enterprise.apigee.com/v1/organizations/${api_organization}/apis/${api_name}/revisions/${api_revision}`,
        qs: { format: 'bundle' },
        auth: { user: apigee_username, password: apigee_password }
    }
}

const makeRequest = config => {
    const { api_name } = config
    request(getOptions(config))
        .on('response', response => {
            if (response.statusCode !== 200) {
                log(colors.error('Status: %s\n'), response.statusCode)
                console.error("Error: something goes wrong on the request process")
                cleanDir(output)
            } else {
                log(colors.info('Status: %s\n'), response.statusCode)
            }
        })
        .on('error', err => {
            console.log("Error:", err)
        })
        .pipe(fs.createWriteStream(output))
        .on('close', () => {
            fs.createReadStream(output)
                .pipe(unzip.Extract({ path: api_name }))
                .on('close', () => {
                    // displays wrong path
                    // console.log(`Proxy downloaded on path: ${__dirname}/${api_name}`);
                    log(colors.warn("==================================================================================="))
                    log(colors.warn("Proxy downloaded successfully..."))
                    log(colors.warn("===================================================================================\n"))
                    cleanDir(output)
                    observable.emit("ready")
                })
        })
}

module.exports = { 
    makeRequest,
    observable
}