const defaultEvent = 'change'
// const program = require('commander')

module.exports = (function () {
    /*
        var processErr = data => {
        console.log(data)
        process.exit()
      }

      program
        .version('0.1.0')
        .option('-d, --dir <directory>', 'Directory to Watch')
        .option('-e, --event <event>', 'Type of Event to Watch')
        .parse(process.argv)

        if (!process.argv.slice(2).length) program.outputHelp(processErr)
        let dir = program.dir || process.env['PWD']
        let event =  program.event || defaultEvent
    */
    let dir   = process.env['PWD']
    let event = defaultEvent

    return {
        'dir'  : dir,
        'event': event
    }
})()