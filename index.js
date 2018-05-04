var { inherits } = require('util')
var { EventEmitter } = require('events')

function Stash (size, gen) {
  if (!(this instanceof Stash)) return new Stash(size, gen)
  EventEmitter.call(this)

  if (typeof size !== 'number') throw new TypeError('size is not a number')
  if (typeof gen !== 'function') throw new TypeError('gen is not a function')

  this._size = size || 1
  this._gen = gen
  this._items = new Array(this._size)
  for (var i = this._size - 1; i > -1; i--) this._items[i] = this._gen()

  this.on('_pop', this._onpop)
}

inherits(Stash, EventEmitter)

Stash.prototype.pop = function pop () {
  var tail = this._items.pop()
  this.emit('_pop')
  return tail
}

Stash.prototype._onpop = function onpop () {
  var diff = this._size - this._items.length
  if (diff > 0) {
    for (var i = 0; i < diff; i++) this._items.unshift(this._gen())
  }
}

function size () {
  return this._items.length
}

Stash.prototype.__defineGetter__('size', size)
Stash.prototype.__defineGetter__('length', size)
Stash.prototype.__defineGetter__('len', size)

module.exports = Stash
