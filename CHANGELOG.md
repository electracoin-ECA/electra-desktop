# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.1.0] - IN PROGRESS

### Added
- Linux AppImage package build.
- Linux RPM package build.

### Changed
- Migration to electron v2.
- Migration to redux-observable v1 (beta).
- Migration to rxjs v6.
- Migration to webpack v4.
- Daemon starting process starting sooner (moved into main process).

### Fixed
- Auto-update on MacOS & Windows: Multiple downloads loop.
- Auto-update on MacOS: No auto-restart with auto-installation.
- Auto-update on MacOS: Stucked quitting behavior.
- Mnemonic recovery.
- Hidden normal quitting error (acting as an install-update-and-quit instead of a simple daemon closing).
- Missing prefixes in (crypto)currencies top shown values.

### Security
- Fixed all Snyk, NSP & npm audit vulnerabilities.

### Removed
- NPM: @types/bitcoinjs-lib
- NPM: classnames
- NPM: open-browser-webpack-plugin,
