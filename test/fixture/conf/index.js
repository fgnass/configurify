var PROFILE = 'BOOP' // in a real-world app this would be an env variable

var a = require('./default')
var b = require('./' + PROFILE) // dynamic require() call

var c = {}

var n
for (n in a) { c[n] = a[n] }
for (n in b) { c[n] = b[n] }

module.exports = c
