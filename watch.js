const chokidar          = require('chokidar')
const path              = require('path')
const updateResources   = require('./update-resource-files')
const updatePolicies    = require('./update-policies-files')
const args              = require('./arguments')
//const { spawn } = require('child_process')

const log = console.log.bind(console)

// chokidar options
var options = { 
    ignoreInitial: true,
    ignored: /(^|[\/\\])\../
}

chokidar.watch(args.dir, options)
    .on(args.event, ( event, wPath ) => {

        console.log("\nstart watching files...\n")

        console.log("==================================================\n")
        
        console.log("watched event", event)
        console.log("watched path", wPath)

        var dirname = path.dirname(wPath)
        
        if (wPath.indexOf('/jsc') > 0) {
            console.log("A javascript Resource has updated")
            console.log("path", dirname)
            var jsFile = path.basename(wPath)
            updateResources(dirname, jsFile)
        }
        
        if (wPath.indexOf('/policies') > 0) {
            console.log("A policy has updated")
            console.log("path", dirname)
            var xmlFile = path.basename(wPath, '.xml')
            console.log("file name", xmlFile)
            updatePolicies(dirname, xmlFile)
        }

        console.log("\n=================================================")
        console.log("\n\n")
    })