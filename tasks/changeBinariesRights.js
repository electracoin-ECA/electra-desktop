const childProcess = require('child_process')
const path = require('path')

if (process.platform === 'darwin') {
  console.log('Updating MacOS binary rights...')
  const process = childProcess
    .spawn('chmod', [
      '755',
      path.resolve(__dirname, '../node_modules/electra-js/bin/electrad-macos'),
    ])
}

if (process.platform === 'linux') {
  console.log('Updating Linux binary rights...')
  const process = childProcess
    .spawn('chmod', [
      '755',
      path.resolve(__dirname, '../node_modules/electra-js/bin/electrad-linux'),
    ])
}
