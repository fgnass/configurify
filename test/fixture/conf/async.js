var BOOP = './boop'

module.exports = function(cb) {
  process.nextTick(function() {
    cb(null, require(BOOP))
  })
}
