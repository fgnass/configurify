var through = require('through2')
var minimatch = require('minimatch')

module.exports = function(f, opts) {

  var p = (opts && opts.pattern) || '**/conf/*'
  if (!minimatch(f, p)) {
    return through()
  }

  return through(
    function(chunk, enc, cb) {
      // ignore the input
      cb()
    },
    function(cb) {

      var self = this
      function serialize(conf) {
        self.push('module.exports=' + conf)
        cb()
      }

      try {
        var conf = require(f)
        if (typeof conf != 'function')
          return serialize(JSON.stringify(conf))

        conf(function(err, conf) {
          if (err) return cb(err)
          serialize('function(cb) { cb(null, '
            + JSON.stringify(conf)
            +')}'
          )
        })
      }
      catch (err) {
        cb(err)
      }

    }
  )
}
