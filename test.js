const tape = require('tape')
const createStash = require('./index')
const { randomBytes } = require('crypto')

tape('rejected pt 1', t => {
  createStash(false, Math.random)
    .then(() => {})
    .catch(err => {
      t.ok(err, 'not a number')
      t.end()
    })
})

tape('rejected pt 2', t => {
  createStash(-1, Math.random)
    .then(() => {})
    .catch(err => {
      t.ok(err, 'not an uint')
      t.end()
    })
})

tape('rejected pt 3', t => {
  createStash(419, randomBytes)
    .then(() => {})
    .catch(err => {
      t.ok(err, 'arity not zero')
      t.end()
    })
})

tape('resolved', t => {
  var size = 5
  createStash(size, Math.random)
    .then(stash => {
      for (var instantItem, i = 0; i < 419; i++) instantItem = stash.pop()
      t.is(stash.size, size, 'got back to size')
      t.end()
    })
    .catch(t.end)
})
