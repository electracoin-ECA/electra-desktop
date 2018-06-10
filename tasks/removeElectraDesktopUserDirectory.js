const fs = require('fs')
const os = require('os')
const path = require('path')
const rimraf = require('rimraf')

let electraDestopUserDirectoryPath

switch (process.platform) {
  case 'darwin':
    electraDestopUserDirectoryPath = path.resolve(os.homedir(), 'Library', 'Application Support', 'Electra Desktop')
    break

  case 'win32':
    electraDestopUserDirectoryPath = path.resolve(os.homedir(), 'AppData', 'Roaming', 'Electra Desktop')
    break

  default:
    electraDestopUserDirectoryPath = path.resolve(os.homedir(), '.Electra Desktop')
}

console.log(`Removing ${electraDestopUserDirectoryPath} directory...`)
rimraf.sync(electraDestopUserDirectoryPath)
