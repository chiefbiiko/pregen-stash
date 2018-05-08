var tape = require('tape')
var stashBox = require('./index')

tape.skip('throws', function (t) {
  t.throws(function () {
    stashBox(5)
  }, 'not a function')
  t.throws(function () {
    stashBox('419', Math.random)
  }, 'not a number')
  t.end()
})

tape('stash', function (t) {
  // t.plan(1)
  var size = 5
  var stash = stashBox(size, Math.random)
  function onready () {
    console.log('::ready::')
    for (var instantItem, i = 0; i < 4; i++) instantItem = stash.pop()
    t.is(stash.size, size, 'got back to size')
    t.end()
  }
  stash.on('ready', onready)
})
