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

## File Structure
```
├── src
│   ├── app
│   │   ├── App.tsx
│   │   ├── addressBook // Available addresses to which you can send
│   │   │   ├── container.tsx
│   │   │   └── index.ts
│   │   ├── electra // Configuration of electra-js library
│   │   │   ├── action-names.ts
│   │   │   ├── action.ts
│   │   │   ├── epics.ts
│   │   │   ├── index.ts
│   │   │   ├── reducer.ts
│   │   │   └── types.ts
│   │   ├── epics.ts // All available epics
│   │   ├── header // Wallet info and settings
│   │   │   ├── action-names.ts
│   │   │   ├── actions.ts
│   │   │   ├── container.tsx
│   │   │   ├── epics.ts
│   │   │   ├── index.ts
│   │   │   ├── reducer.ts
│   │   │   ├── types.ts
│   │   │   └── wallet-info // Wallet info component
│   │   │       ├── component.tsx
│   │   │       ├── index.ts
│   │   │       └── types.ts
│   │   ├── store.tsx
│   │   ├── styles
│   │   │   ├── fonts // Necessary fonts for development
│   │   │   │   ├── montserrat-v12-latin-100.woff
│   │   │   └── vendors // css
│   │   │       └── toolkit.css
│   │   ├── styles.scss
│   ├── assets
│   │   └── images
│   ├── index.html
│   ├── index.tsx
│   └── utils
│       └── common.ts
```
> Note: This may not be up to date and should only be used as a guide to how the files are structured.

The project is structured by features. Each feature folder contains, the following files:

- action-names.ts
- actions.ts
- container.tsx
- epics.ts
- index.ts
- reducer.ts
- types.ts
- component (Optional)

The following is how everything interacts:

Container.tsx will dispatch an action. The action will return an action type. Afterwards either a function in the epics is going to pick and process that action type or a case in the it's reducer.

```
 container.tsx -> actions -> epics/reducers -> actions
```
