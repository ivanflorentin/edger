const chokidar = require('chokidar')
const path = require('path')
const updateResources = require('./update-resource-files')
const updatePolicies = require('./update-policies-files')
const args = require('./arguments')

const log = console.log.bind(console)

// chokidar options
var options = {
  ignoreInitial: true,
  ignored: /(^|[\/\\])\../
}

log('\nstart watching files...\n')
log('==================================================\n')

chokidar.watch(args.dir, options)
  .on(args.event, (wPath, event) => {
    log(wPath, '-->', event)
    var dirname = path.dirname(wPath)

    if (wPath.indexOf('/jsc') > 0) {
      log('Updated js file: ', wPath)
      //log('path', dirname)
      var jsFile = path.basename(wPath)
      updateResources(dirname, jsFile)
    }

    if (wPath.indexOf('/policies') > 0) {
      log('Updating policy: ', wPath)
//      log('path', dirname)
      var xmlFile = path.basename(wPath, '.xml')
      log('file name', xmlFile)
      updatePolicies(dirname, xmlFile)
    }
  })
