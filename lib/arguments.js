const program = require('commander')
const defaultEvent = 'change'

// var processErr = data => {
//     console.log(data)
//     process.exit(1)
// }

module.exports = (function () {

    program
        .version('0.2.0')
        .option('-d, --dir <directory>', 'Directory to Watch')
        .option('-e, --event <event>', 'Type of Event to Watch (default event is Change)')
        .option('-D, --download-bundle', 'Download the bundle and then start to watch it')
        .option('-A, --auto-update', 'Automatic updates when Proxy Endpoint File changes, if not Edger will prompt you')
        .parse(process.argv)

    //if (!process.argv.slice(2).length) program.outputHelp(processErr)
    let dir = program.dir || process.env['PWD']
    let event = program.event || defaultEvent
    
    if (program.downloadBundle)
        return { dir, event, downloadBundle: true }
    else
        return { dir, event, autoUpdate: program.autoUpdate }
})()