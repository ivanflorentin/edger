#!/usr/bin/node

const chokidar = require('chokidar')
const path = require('path')
const updateResources = require('./lib/update-resource-files')
const updatePolicies = require('./lib/update-policies-files')
const updateRevision = require('./lib/export-bundle')
const args = require('./lib/arguments')

const log = console.log.bind(console)
const configurer = require('./lib/create-config.js')

const config = configurer(args)

// chokidar options
const options = {
    ignoreInitial: true,
    ignored: /(^|[\/\\])\../
}

log(`Starting Watcher for \nProxy: ${config.api_name} \nRevision: ${config.api_revision} \nOrganization: ${config.api_organization}\nUser: ${config.apigee_username}`)

chokidar.watch(args.dir, options)
    .on(args.event, (wPath, event) => {

        var dirname = path.dirname(wPath)

        if (wPath.indexOf('/jsc') > 0) {
            var jsFile = path.basename(wPath)
            updateResources(config, dirname, jsFile)
        }

        if (wPath.indexOf('/policies') > 0) {
            log('Updating policy: ', wPath)
            var xmlFile = path.basename(wPath, '.xml')
            log('file name', xmlFile)
            updatePolicies(config, dirname, xmlFile)
        }
        // wPath.indexOf('/targets') > 0
        if (wPath.indexOf('/proxies') > 0 || wPath.indexOf(`/${config.api_name}.xml`) > 0) {
            log('main proxy file updated: ', wPath)
            var xmlFile = path.basename(wPath, '.xml')
            var currentDir = path.dirname(wPath)
            log('file name', xmlFile)
            var dirToExport = currentDir.replace('/proxies', "");
            log('dir to export', dirToExport)
            updateRevision(config, dirToExport)
        }

    })
