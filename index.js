#!/usr/bin/node

const chokidar = require('chokidar')
const path = require('path')
const colors = require('colors/safe')
const readline = require('readline')
const updateResources = require('./lib/update-resource-files')
const updatePolicies = require('./lib/update-policies-files')
const updateRevision = require('./lib/export-bundle')
const args = require('./lib/arguments')

const log = console.log.bind(console)
const configurer = require('./lib/create-config.js')

const config = configurer(args)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

colors.setTheme({
    verbose : 'cyan',
    info    : 'green',
    error   : 'red',
    warn    : 'yellow'
})

// chokidar options
const options = {
    ignoreInitial: true,
    ignored: /(^|[\/\\])\../
}

log(colors.green("==================================================================================="))
log(colors.green(`Starting Watcher for \nProxy: ${config.api_name} \nRevision: ${config.api_revision} \nOrganization: ${config.api_organization}\nUser: ${config.apigee_username}`))
log(colors.green("===================================================================================\n"))

chokidar.watch(args.dir, options)
    .on(args.event, (wPath, event) => {

        var dirname = path.dirname(wPath)

        if (wPath.indexOf('/jsc') > 0) {
            var jsFile = path.basename(wPath)
            updateResources(config, dirname, jsFile)
        }

        if (wPath.indexOf('/policies') > 0) {
            log(colors.warn("\n==================================================================================="))
            log(colors.warn('Updating policy...'))
            log(colors.warn("===================================================================================\n"))
            var xmlFile = path.basename(wPath, '.xml')
            log(colors.verbose('file name: %s.xml'), xmlFile)
            log(colors.verbose(wPath))
            updatePolicies(config, dirname, xmlFile)
        }

        if (wPath.indexOf('/proxies') > 0 || wPath.indexOf(`/${config.api_name}.xml`) > 0) {
            rl.question('Are you sure you want to upload the bundle to Apigee? (Y/n): ', answer => {
                
                if (/y(?:es)?|1/i.test(answer)) {
                        //log(colors.warn('main proxy file updated: %s'), wPath)
                        var currentDir = path.dirname(wPath)
                        //log(colors.warn('file name: %s'), xmlFile)
                        var dirToExport = currentDir.replace('/proxies', "")
                        log(colors.warn("\n==================================================================================="))
                        log(colors.warn("Directory to export"))
                        log(colors.warn("===================================================================================\n"))
                        log(colors.verbose(dirToExport))
                        updateRevision(config, dirToExport)
                } else {
                    log(colors.error("\nAPI Proxy not updated"))
                }

            })
        }
    })
