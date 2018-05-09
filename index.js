const Stash = require('./stash')

const createStash = (size, gen) => {
  return new Promise((resolve, reject) => {
    try { new Stash(size, gen, function onready () { resolve(this) }) }
    catch (err) { reject(err) }
  })
}

module.exports = createStash
