const ElectraJs = require('electra-js')
const fs = require('fs')
const os = require('os')
const rimraf = require('rimraf')

const electraJs = new ElectraJs({ hard: true })

console.log(`Removing ${electraJs.constants.DAEMON_USER_DIR_PATH} directory...`)
rimraf.sync(electraJs.constants.DAEMON_USER_DIR_PATH)
