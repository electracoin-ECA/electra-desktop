const fs = require('fs')
const os = require('os')
const path = require('path')
const rimraf = require('rimraf')

let electraDaemonUserDirectoryPath

switch (process.platform) {
  case 'darwin':
    electraDaemonUserDirectoryPath = path.resolve(os.homedir(), 'Library/Application Support/Electra')
    break

  case 'win32':
    electraDaemonUserDirectoryPath = path.resolve(os.homedir(), 'AppData/Roaming/Electra')
    break

  default:
    electraDaemonUserDirectoryPath = path.resolve(os.homedir(), '.Electra')
}

console.log(`Removing ${electraDaemonUserDirectoryPath} directory...`)
rimraf.sync(electraDaemonUserDirectoryPath)
