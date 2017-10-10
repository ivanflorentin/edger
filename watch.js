const chokidar       = require('chokidar')
const path           = require('path')
const updateResource = require('./updateResourceFile')
const args           = require('./arguments')
//const { spawn } = require('child_process')

const log = console.log.bind(console)

// chokidar options
var options = { 
    ignoreInitial: true,
    ignored: /(^|[\/\\])\../
}

chokidar.watch(args.dir, options)
    .on(args.event, ( event, wPath ) => {
        
        console.log("event", event)
        console.log("path", wPath)
        if (wPath.indexOf('/jsc/') > 0) {
            var file    = path.basename(wPath)
            var dirname = path.dirname(wPath)
            console.log("file", file)
            console.log("path", dirname)
            updateResource(dirname, file)
        }

    })
