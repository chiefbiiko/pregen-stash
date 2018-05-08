var { inherits } = require('util')
var { EventEmitter } = require('events')

function noop () {}

function Stash (size, gen, onready) {
  if (!(this instanceof Stash)) return new Stash(size, gen, onready)
  EventEmitter.call(this)

  this._size = size
  this._items = new Array(this._size)
  this._gen = gen

  this.on('_fill', this._onfill)
  this.on('_pop', this._onpop)
  this.on('_ready', onready)
  this.emit('_fill')
}

inherits(Stash, EventEmitter)

Stash.prototype.pop = function pop () {
  var tail = this._items.pop()
  this.emit('_pop')
  return tail !== undefined ? tail : this._gen()
}

Stash.prototype._onpop = function _onpop () {
  var diff = this._size - this._items.length
  if (diff > 0) {
    for (var i = 0; i < diff; i++) this._items.unshift(this._gen())
  }
}

Stash.prototype._onfill = function _onfill () {
  for (var i = this._size - 1; i > -1; i--) this._items[i] = this._gen()
  this.emit('_ready')
}

Stash.prototype.__defineGetter__('size', function size () {
  return this._items.length
})

module.exports = Stash
