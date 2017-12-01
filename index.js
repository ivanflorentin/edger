#!/usr/bin/node

const chokidar = require('chokidar')
const path = require('path')
const colors = require('colors/safe')
const readline = require('readline')
const updateResources = require('./lib/update-resource-files')
const updatePolicies = require('./lib/update-policies-files')
const uploadBundle = require('./lib/upload-bundle')
const downloadBundle = require('./lib/download-bundle')
const args = require('./lib/arguments')

const log = console.log.bind(console)
const configurer = require('./lib/create-config.js')

const config = configurer(args)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

colors.setTheme({
    verbose: 'cyan',
    info: 'green',
    error: 'red',
    warn: 'yellow'
})

// chokidar options
const options = {
    ignoreInitial: true,
    ignored: /(^|[\/\\])\../
}

downloadBundle.observable.on('ready', function () {
    log(colors.green("==================================================================================="))
    log(colors.green("Starting Watcher for"))
    log(colors.green("===================================================================================\n"))
    log(`Proxy: ${config.api_name} \nRevision: ${config.api_revision} \nOrganization: ${config.api_organization}\nUser: ${config.apigee_username}\n`)
    try {
        process.chdir(`${config.api_name}`);
        log(colors.verbose(`Moving to directory: ${process.cwd()}`))
        startWatcher()
    } catch (err) {
        console.error(`chdir: ${err}`);
    }
})

const isFolderChanged = ( pathChanged, folder ) => !!~pathChanged.indexOf(folder)

const startWatcher = () => {
    chokidar.watch(args.dir, options)
        .on(args.event, wPath => {

            let dirname = path.dirname(wPath)

            if (isFolderChanged(wPath, '/jsc')) {
                log(colors.warn("\n==================================================================================="))
                log(colors.warn("Updating js file..."))
                log(colors.warn("===================================================================================\n"))
                let jsFile = path.basename(wPath)
                log(colors.verbose(`${dirname}/${jsFile}`))
                updateResources(config, dirname, jsFile)
            }

            if (isFolderChanged(wPath, '/policies')) {
                log(colors.warn("\n==================================================================================="))
                log(colors.warn("Updating policy..."))
                log(colors.warn("===================================================================================\n"))
                // we specify a file extension to extract because Apigee API needs the file name in the url
                let xmlFile = path.basename(wPath, '.xml')
                log(colors.verbose(wPath))
                updatePolicies(config, dirname, xmlFile)
            }

            const updateCurrentRevision = () => {
                log(colors.warn("\n==================================================================================="))
                log(colors.warn("Uploading directory..."))
                log(colors.warn("===================================================================================\n"))
                let dirToUpload = dirname.replace('/proxies', "")
                log(colors.verbose(dirToUpload))
                uploadBundle(config, dirToUpload)
            }

            if (isFolderChanged(wPath, '/proxies') || isFolderChanged(wPath, `/${config.api_name}.xml`)) {
                if (args.autoUpdate) {
                    updateCurrentRevision()
                } else {
                    rl.question('Are you sure you want to upload the bundle to Apigee? (Y/n): ', answer => {
                        if (/y(?:es)?|1/i.test(answer)) {
                            updateCurrentRevision()
                        } else {
                            log(colors.error("\nAPI Proxy not updated"))
                        }
                    })
                }
            }
        })
}

if (args.downloadBundle) {
    log(colors.cyan("==================================================================================="))
    log(colors.cyan("Starting Download for"))
    log(colors.cyan("===================================================================================\n"))
    log(`Proxy: ${config.api_name} \nRevision: ${config.api_revision} \nOrganization: ${config.api_organization}\nUser: ${config.apigee_username}\n`)
    downloadBundle.makeRequest(config)
} else {
    log(colors.green("==================================================================================="))
    log(colors.green("Starting Watcher for"))
    log(colors.green("===================================================================================\n"))
    log(`Proxy: ${config.api_name} \nRevision: ${config.api_revision} \nOrganization: ${config.api_organization}\nUser: ${config.apigee_username}\n`)
    startWatcher()
}