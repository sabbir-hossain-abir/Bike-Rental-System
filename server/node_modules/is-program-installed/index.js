const { readdirSync } = require('fs')
const { execSync } = require('child_process')

const opts = {
  stdio: 'ignore'
}
const exec = (cmd) => execSync(cmd, opts)

const isUnixInstalled = (program) => {
  try {
    exec(`hash ${program} 2>/dev/null`)
    return true
  } catch {
    return false
  }
}

const isDirectory = (path) => {
  try {
    readdirSync(path)
    return true
  } catch {
    return false
  }
}
const isDotDesktopInstalled = (program) => {
  const dirs = [
    process.env.XDG_DATA_HOME && process.env.XDG_DATA_HOME + '/applications',
    process.env.HOME && process.env.HOME + '/.local/share/applications',
    '/usr/share/applications',
    '/usr/local/share/applications'
  ]
    .filter(Boolean)
    .filter(isDirectory)

  const trimExtension = (x) => x.replace(/\.desktop$/, '')
  const desktopFiles = dirs
    .flatMap((x) => readdirSync(x))
    .filter((x) => x.endsWith('.desktop'))
    .map(trimExtension)

  const programTrimmed = trimExtension(program)
  return desktopFiles.includes(programTrimmed)
}

const isMacInstalled = (program) => {
  try {
    exec(`osascript -e 'id of application "${program}"' 2>&1>/dev/null`)
    return true
  } catch {
    return false
  }
}

const isWindowsInstalled = (program) => {
  // Try a couple variants, depending on execution environment the .exe
  // may or may not be required on both `where` and the program name.
  const attempts = [
    `where ${program}`,
    `where ${program}.exe`,
    `where.exe ${program}`,
    `where.exe ${program}.exe`
  ]

  let success = false
  for (const a of attempts) {
    try {
      exec(a)
      success = true
    } catch {}
  }

  return success
}

const sanitize = (program) => {
  // from https://github.com/parshap/node-sanitize-filename/ licensed WTFPL/ISC
  /* eslint-disable no-useless-escape,no-control-regex */
  const illegalRe = /[\/\?<>\\:\*\|"]/g
  const controlRe = /[\x00-\x1f\x80-\x9f]/g
  const reservedRe = /^\.+$/
  const probablyTwoThingsRe = /\&\&/g
  /* eslint-enable no-useless-escape,no-control-regex */
  return program
    .replace(illegalRe, '')
    .replace(controlRe, '')
    .replace(reservedRe, '')
    .replace(probablyTwoThingsRe, '')
}

module.exports = (program) => [
  isUnixInstalled,
  isMacInstalled,
  isWindowsInstalled,
  isDotDesktopInstalled
].some((f) => f(sanitize(program)))
