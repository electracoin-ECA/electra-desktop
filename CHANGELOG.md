# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.1.0] - IN PROGRESS

### Added
- Linux AppImage package build.
- Linux RPM package build.
- A title bar with minimize, maximize and close buttons for Windows.
- NPM: @electra/electra-styleguide.
- Windows ia32 architecture package build.
- "ALL" button in payment sending card.
- Progress bar in the header while downloading the blockchain.

### Changed
- Migration to electron v2.
- Migration to redux-observable v1 (beta).
- Migration to rxjs v6.
- Migration to webpack v4.
- Daemon starting process starting sooner (moved into main process).
- Automatically remove daemon user data when generating a new mnemonic or recovering one.
- In the information popover: "Status", "Your weight" and "Next reward" now outputs "Syncing blockchain..." when the
  wallet in not synchromized.

### Fixed
- Auto-update on MacOS & Windows: Multiple downloads loop.
- Auto-update on MacOS: No auto-restart with auto-installation.
- Auto-update on MacOS: Stucked quitting behavior.
- Login mnemonic recovery.
- Hidden normal quitting error (acting as an install-update-and-quit instead of a simple daemon closing).
- Missing prefixes in (crypto)currencies top shown values.
- Payments page caret down icon.
- Router (react-router) redirection issue.
- Full available account balance sending.
- Balances & ammounts decimals issues (some may be left).

### Security
- Fixed all Snyk, NSP & npm audit vulnerabilities.

### Removed
- NPM: @types/bitcoinjs-lib
- NPM: classnames
- NPM: open-browser-webpack-plugin,
