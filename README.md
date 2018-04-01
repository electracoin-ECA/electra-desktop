# Electra Wallet
Electron wallet for **Electra** blockchain


## Contribute

### Getting Started

**Prerequisites**
* Node >= 9.4
* [Python v2](https://www.python.org/downloads/)
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

The staging environment uses static files but let the web developement console open.

    npm run start:stag

**Build an installable package**

    npm run package:stag

### Production

The production enviromment uses static files and doesn't allow the web developement console.

    npm run start:prod

**Build an installable package**

    npm run package:prod

## Concepts

## Roadmap / Todo
- [x] Integrate Wallet Setup / On boarding Flow
- [x] Use Electra-Js for blockchain interaction
- Necessary features to complete
	- [ ] Add necessary views
	- [ ] Generate HD wallet
	- [ ] Receive ECA
	- [ ] Send ECA
	- [ ] Wallet locking/unlocking
- Good to have features:
	- [ ] Block explorer
	- [ ] ECA price feed
	- [ ] Social pay
