const createStash = require('./index')

createStash(5, Math.random)
  .then(stash => {
    for (var i = 0; i < 13; i++) console.log(stash.pop(), stash.size)
  })
  .catch(console.error)
