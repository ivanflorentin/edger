const program = require('commander')
const defaultEvent = 'change'

module.exports = (function () {
    let dir = null
    return program
            .version('0.2.0')
            .option('-d, --dir [directory]', '(optional) directory to Watch', dir, process.env['PWD'])
            .option('-e, --event [event]', '(optional) type of Event to Watch (default event is Change)', defaultEvent)
            .option('-D, --download-bundle', '(optional) download the bundle and then start to watch it')
            .option('-A, --auto-update', '(optional) updates automatically when the Proxy Endpoint File changes, if not Edger will prompt to you')
            .parse(process.argv)
    
})()