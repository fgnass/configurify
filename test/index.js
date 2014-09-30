var vm = require('vm')

var browserify = require('browserify')
var test = require('tap').test

var configurify = require('../')

test('sync', function(t) {
  t.plan(1)

  var b = browserify()
  b.transform(configurify)

  b.add(__dirname + '/fixture/sync')

  b.bundle(function(err, src) {
    if (err) t.fail(err)

    // execute the bundle
    vm.runInNewContext(src, {

      // ex() will be invoked by sync.js
      ex: function(conf) {
        t.same(conf, { foo: 'bar', beep: 'boop!' })
        t.end()
      }
    })
  })
})


test('async', function(t) {
  t.plan(1)

  var file = __dirname + '/fixture/async'

  var b = browserify()
  b.transform(configurify)

  b.add(file)

  b.bundle(function(err, src) {
    if (err) t.fail(err)

    // execute the bundle
    vm.runInNewContext(src, {
      ex: function(err, conf) {
        if (err) t.fail(err)
        t.same(conf, { beep: 'boop!' })
        t.end()
      }
    }, file)
  })
})
