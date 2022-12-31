#!/usr/bin/env node

const alert = require('./node')
const input = process.argv.slice(2).join(' ')
alert(input)
