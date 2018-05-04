var stashBox = require('.')

var stash = stashBox(5, Math.random)

console.log('start size:', stash.size)

for (var i = 0; i < 13; i++) console.log('just popd:', stash.pop())

console.log('end size:', stash.size)
