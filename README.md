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
│   │   ├── addressBook
│   │   │   ├── container.tsx
│   │   │   └── index.ts
│   │   ├── electra
│   │   │   ├── action-names.ts
│   │   │   ├── action.ts
│   │   │   ├── epics.ts
│   │   │   ├── index.ts
│   │   │   ├── reducer.ts
│   │   │   └── types.ts
│   │   ├── epics.ts
│   │   ├── header
│   │   │   ├── action-names.ts
│   │   │   ├── actions.ts
│   │   │   ├── container.tsx
│   │   │   ├── epics.ts
│   │   │   ├── index.ts
│   │   │   ├── reducer.ts
│   │   │   ├── types.ts
│   │   │   └── wallet-info
│   │   │       ├── component.tsx
│   │   │       ├── index.ts
│   │   │       └── types.ts
│   │   ├── store.tsx
│   │   ├── styles
│   │   │   ├── fonts
│   │   │   │   ├── montserrat-v12-latin-100.woff
│   │   │   └── vendors
│   │   │       └── toolkit.css
│   │   ├── styles.scss
│   ├── assets
│   │   └── images
│   ├── index.html
│   ├── index.tsx
│   └── utils
│       └── common.ts
```
	Note: This may not be up to date and should only be used as a guide to how the files are structured.