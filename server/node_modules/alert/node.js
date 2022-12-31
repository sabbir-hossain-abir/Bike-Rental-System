const { execSync, spawn } = require('child_process')
const { platform } = process
const { join } = require('path')
const isProgramInstalled = require('is-program-installed')
const windowsScript = join(__dirname, 'msgbox.vbs')

const execCmd = (cmds) => spawn(cmds[0], cmds.splice(1))

const unixPrograms = [
  'kdialog',
  'zenity',
  'yad',
  'notify-send',
  'xmessage',
  'dialog',
  'whiptail'
]

const bestUnixProgram = unixPrograms.filter(isProgramInstalled)[0] || 'console'

const cscript = (s) => ['cscript', windowsScript, s]
const msg = (str) => ['msg', '"%username%"', str]
const zenity = (s) => ['zenity', '--info', '--text', s]
const yad = (s) => ['yad', '--text', s, '--button', 'OK']
const notifySend = (s) => ['notify-send', s]
const xmessage = (s) => ['xmessage', s]
const dialog = (s) => ['dialog', '--msgbox', s, '10', '30']
const whiptail = (s) => ['whiptail', '--msbox', s, '10', '30']
const kdialog = (s) => ['kdialog', '--msgbox', s]
const osascript = (s) => [
  'osascript',
  '-e',
  `tell app "System Events" to display dialog "${s}" buttons "OK"`
]

const hasCscript =
  platform.startsWith('win') &&
  (() => {
    try {
      execSync('cscript')
      return true
    } catch {
      return false
    }
  })()

const nameMap = {
  console: console.log,
  cscript,
  dialog,
  kdialog,
  msg,
  'notify-send': notifySend,
  osascript,
  whiptail,
  xmessage,
  yad,
  zenity
}

const getAlert = (input = '', thingToUse = '') => {
  const execInput = (cmd) => execCmd(cmd(input))

  const pickFromNameMap = (option = bestUnixProgram) => {
    if (option !== 'console') {
      if (nameMap[option]) {
        return execInput(nameMap[option])
      }
    }
    return console.log(input)
  }

  if (thingToUse) {
    return pickFromNameMap(thingToUse)
  }

  switch (platform) {
    case 'linux':
    case 'freebsd':
    case 'sunos':
      return pickFromNameMap(bestUnixProgram)
    case 'darwin':
      return execInput(osascript)
    case 'win32':
      return hasCscript ? execInput(cscript) : execInput(msg)
    default:
      return console.log(input)
  }
}

module.exports = process.env.DISABLE_ALERT !== '1' ? getAlert : () => {}
