# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.1.0]

### Added

- Development server proxy to a Pexip Infinity server, configured with
  `VITE_INFINITY_TARGET` in a `.env` file. The port can be changed with
  `VITE_DEV_SERVER_PORT`.
- Development branding manifest served at `/webapp3/branding/manifest.json`,
  which loads the plugin from the local dev server.
- `.env.example` and documentation of the `.env` setup.
- Documentation of `sip.json` in the README.
- GitHub Actions workflow for building the plugin.

### Changed

- Updated dependencies, including Vite 8, TypeScript 7, ESLint 10 and
  `@pexip/plugin-api` 22.4.1.
- Switched TypeScript `moduleResolution` to `bundler`.
- Reworked the README: step-by-step usage, clearer configuration and setup
  instructions.

### Removed

- The `@pexip/components` dependency. The `Option` type is now defined locally.
- Stray `file:` self-dependencies from `package.json`.

## [1.0.0]

### Added

- Toolbar button for participants with the host role that opens a department
  selection dialog.
- Cart selection for the chosen department, followed by a SIP dial out to the
  selected cart.
- Departments and carts configured in `public/config/departments.json`.
- SIP host and role configured in `public/config/sip.json`.
- Messages shown when no departments or no carts are configured.
- `mkcert` support for serving the dev server over HTTPS.
- README with usage, configuration and build instructions.
