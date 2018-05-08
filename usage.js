var stashBox = require('.')

var stash = stashBox(5, Math.random, onready)

function onready () {
  console.log('start size:', this.size)
  for (var i = 0; i < 13; i++) console.log('just popd:', this.pop())
  console.log('end size:', this.size)
}
