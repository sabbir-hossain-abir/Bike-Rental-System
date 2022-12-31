# is-program-installed

Check if a program is installed.

[![Support with PayPal](https://img.shields.io/badge/paypal-donate-yellow.png)](https://paypal.me/zacanger) [![Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/zacanger) [![ko-fi](https://img.shields.io/badge/donate-KoFi-yellow.svg)](https://ko-fi.com/U7U2110VB)

--------

## Installation

`npm i is-program-installed`

## Usage

```javascript
const isInstalled = require('is-program-installed')
isInstalled('ls') // => true
isInstalled('Slack.app') // => true
isInstalled('powershell.exe') // => true
isInstalled('valid-linux-app.desktop') // => true
isInstalled('something-that-does-not-exist') // => false
```

[LICENSE](./LICENSE.md)
