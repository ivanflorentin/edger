#!/usr/bin/node

const chokidar = require('chokidar')
const path = require('path')
const updateResources = require('./lib/update-resource-files')
const updatePolicies = require('./lib/update-policies-files')
const args = require('./lib/arguments')

const log = console.log.bind(console)
const configurer = require('./lib/create-config.js')

const config = configurer(args)

// chokidar options
var options = {
  ignoreInitial: true,
  ignored: /(^|[\/\\])\../
}

log(`Starting Watcher for \nProxy: ${config.api_name} \nRevision: ${config.api_revision} \nOrganization: ${config.api_organization}\nUser: ${config.apigee_username}` )

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
  })
