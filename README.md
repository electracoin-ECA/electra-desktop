# Electra Wallet
Electron wallet for **Electra** blockchain


### Installation

> Note: node version 9.4.0 is required for installation
#### Development (with hot reloading)
`yarn`

`yarn run dev`

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
