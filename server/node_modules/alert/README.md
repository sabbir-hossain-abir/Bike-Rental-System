# alert

----

Cross-platform, isomorphic alert, for Node and browser (previously alert-node)

**IMPORTANT** this project was previously called `alert-node`. The package name
changed in v4. Huge thanks to [@iclanzan](https://github.com/iclanzan) for the
package name!

* Uses `window.alert` in the browser.
* Uses `kdialog` `zenity`, `yad`, `notify-send`, `xmessage`, `dialog`, or `whiptail` on Linux and BSD (depending on what's available).
* Uses `osascript`/`System Events` on Mac.
* Uses `cscript` on Windows (or `msg` if `cscript` fails).
* Defaults to `console.log`.

--------

## Installation:

`npm i alert`

## Usage:

```javascript
import alert from 'alert'

alert('howdy')
```

If using the API, you can specify a program to use. This can be one of:

* dialog (Linux)
* kdialog (Linux)
* notify-send (Linux)
* whiptail (Linux)
* xmessage (Linux)
* yad (Linux)
* zenity (Linux)
* osascript (Mac)
* cscript (Windows)
* msg (Windows)
* console (`console.log`)

Note that this will override any internal checks to get the correct program,
and will blow up if you get it wrong. It's advised to just use the default behavior.

```javascript
import alert from 'alert'
alert('hey!', 'yad')
```

`alert` also has a cli. `npm i -g alert` and run `alert 'sup brah'`.

To disable alert for testing purposes or otherwise, you can set an environment variable `DISABLE_ALERT=1`.

[LICENSE](./LICENSE.md)
