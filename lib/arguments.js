const program = require('commander')
const defaultEvent = 'change'

// var processErr = data => {
//     console.log(data)
//     process.exit(1)
// }

module.exports = (function () {

    program
        .version('0.1.0')
        .option('-d, --dir <directory>', 'Directory to Watch')
        .option('-e, --event <event>', 'Type of Event to Watch')
        .option('-D, --download-bundle', 'Type of Event to Watch')
        .parse(process.argv)

    //if (!process.argv.slice(2).length) program.outputHelp(processErr)
    let dir = program.dir || process.env['PWD']
    let event = program.event || defaultEvent
    
    if (program.downloadBundle)
        return { dir, event, downloadBundle: true }
    else
        return { dir, event }
})()