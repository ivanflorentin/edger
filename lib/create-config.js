const xmlparser = require('xml-parser')
const fs = require('fs')

const log = console.log.bind(console)

const getEnvVariables = () => {
    let result = {}
    const env = process.env

    if (env.APIGEE_USERNAME) {
        result.apigee_username = env.APIGEE_USERNAME
    }

    if (env.APIGEE_PASSWORD) {
        result.apigee_password = env.APIGEE_PASSWORD
    }

    if (env.API_REVISION) {
        result.api_revision = env.API_REVISION
    }

    if (env.API_NAME) {
        result.api_name = env.API_NAME
    }

    if (env.API_ORGANIZATION) {
        result.api_organization = env.API_ORGANIZATION
    }

    if (env.API_ENVIRONMENT) {
        result.api_environment = env.API_ENVIRONMENT
    }
    
    return result
}

const getConfigFromXML = () => {
    try {
        let xmls = fs.readdirSync('./apiproxy', 'utf8').filter(fname => {
            if (fname.split('.').indexOf('xml') > 0 && fname.split('.').indexOf('swp') === -1) {
                return fname
            }
        })

        if (xmls.length !== 1) {
            throw ('Could not determine XML file, please specify config file')
        }

        const cfile = fs.readFileSync(`./apiproxy/${xmls[0]}`, 'utf8')
        const xmlconfig = xmlparser(cfile)

        return {
            api_name: xmlconfig.root.attributes.name,
            api_revision: xmlconfig.root.attributes.revision
        }
    } catch (err) {
        if (err.errno !== -2 || err.path !== './apiproxy' || err.syscall !== 'scandir' || err.code !== 'ENOENT') {
            log(err)
        }
    }
}

const getConfigFromFile = () => {
    try {
        fs.readFileSync('edger.json')
    } catch (err) {
        log(err)
    }
}


module.exports = parameters => ({...getEnvVariables(), ...getConfigFromXML()})
