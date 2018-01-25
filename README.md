Electra-Desktop
==
This is a work in progress to showcase a possible approach for the implementation of a new electra wallet (proof of concept for using electron+vue). Would love to hear your feedback. 

For now this application only accesses basic wallet info via the jsonrpc like balance or transactions. Sending ECA (to one recipient) is also possible. 

Please keep in mind that the UI design used here is only for this showcase, it will be replaced by the design which is currently being created. 

### Tech stack 
- application framework: electron
- ui framework: vuejs
- state management: vuex
- build process: electron-forge (provides automatic build, might need to replace this with custom webpack build in the future)

### Prerequisites
- node + npm or yarn
- Electra-Qt (right now this app requires that the Electra-Qt wallet is running because it controls the `Electrad` process, when Electra-Js is ready this will not be required)

### Installation
```npm install```

Set NODE_ENV to 'development' or 'production'

### Running & Development (with hot reloading)

```npm start```

### Packaging
This will package the app based on specified make targets in `package.json`. (Currently tested and works on osx, on windows there is still an issue with the icon inclusion)

```npm run package```

## Concepts

### Theming / Style 
The app is built with optimal themeability in mind. The theme can be configured via stylus variables in App.vue. Colors and styles used right now are based on my own design draft which is not final and will probably be adjusted to match the upcoming desktop wallet design by thomasotter. 

### State Management
If you check out `/src/store/module-wallet.js` you can see the current wallet state management with vuex. Store modules can easily be changed and added without having to change things in the UI Views/Components themselves. 

## Roadmap / Todo
- Integrate Wallet Setup / Onboarding Flow
- Use Electra-Js for blockchain interaction
- Add missing functionality and views
- Features: 
	- social pay
	- block explorer
	- ECA price feed
	- wallet locking/unlocking

