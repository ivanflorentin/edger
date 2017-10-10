var program = require('commander');

module.exports = (function() {

    var processErr = data => {
        console.log(data)
        process.exit()
    }

    program
        .version('0.1.0')
        .option('-d, --dir <directory>' , 'Directory to Watch     (required)')
        .option('-e, --event <event>'   , 'Type of Event to Watch (required)')
        .parse(process.argv);

    if (!process.argv.slice(2).length) program.outputHelp(processErr)
    if (!program.dir) program.outputHelp(processErr)
    if (!program.event) program.outputHelp(processErr)

    return {
        dir: program.dir,
        event: program.event
    }

})()
