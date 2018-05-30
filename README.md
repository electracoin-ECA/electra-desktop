# Electra Wallet

Electron wallet for **Electra** blockchain

[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/Electra-project/electra-desktop.svg?style=flat-square)](https://github.com/Electra-project/electra-desktop/releases)
[![Github All Releases](https://img.shields.io/github/downloads/Electra-project/electra-desktop/total.svg?style=flat-square)](https://github.com/Electra-project/electra-desktop/releases)
[![David](https://img.shields.io/david/Electra-project/electra-desktop.svg?style=flat-square)](https://david-dm.org/Electra-project/electra-desktop)
[![David](https://img.shields.io/david/dev/Electra-project/electra-desktop.svg?style=flat-square)](https://david-dm.org/InspiredBeings/electra-desktop)

[![NSP Status](https://nodesecurity.io/orgs/electra-project/projects/37b08e1f-04ad-4005-8187-916630475872/badge)](https://nodesecurity.io/orgs/electra-project/projects/37b08e1f-04ad-4005-8187-916630475872)

## Issues & Feedback

Please report any issue or provide your feedback [there](https://github.com/Electra-project/electra-desktop/issues).

## Contribute

### Getting Started

**Prerequisites**
* [NodeJS v10 (with npm v6)](https://nodejs.org)
* Windows: [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools#readme)

**Installation**

    npm i

### Development

The development environment uses hot-reload.

    npm start

**Start with a brand new wallet**

This command will remove the Electra user directories (daemon & Electron ones) before starting.

    npm run start:new

**Validation**

    npm run validate

### Staging

The staging environment uses static files but let the web development console open.

    npm run start:stag

**Build an installable package**

    npm run package:stag

### Production

The production enviromment uses static files and doesn't allow the web development console.

    npm run start:prod

**Build an installable package**

    npm run package:prod
