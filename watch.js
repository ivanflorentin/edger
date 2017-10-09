const chokidar = require('chokidar')

const { spawn } = require('child_process')
const log = console.log.bind(console)
chokidar.watch('.', {ignoreInitial: true }).on('all', (event, path) => {
  if (path.indexOf('/jsc/') > 0) {
    log('updateJsResource.sh', path)
    let update = spawn('./updateJsResource.sh', [path])
    update.stdout.on('data', (data) => {
      log(`stdout: ${data}`)
    })
    update.stderr.on('data', (data) => {
      log(`stdout: ${data}`)
    })
    update.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    })
  }
})
