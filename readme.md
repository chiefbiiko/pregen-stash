# pregen-stash

[![build status](http://img.shields.io/travis/chiefbiiko/pregen-stash.svg?style=flat)](http://travis-ci.org/chiefbiiko/pregen-stash) [![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/chiefbiiko/pregen-stash?branch=master&svg=true)](https://ci.appveyor.com/project/chiefbiiko/pregen-stash)

***

FIFO data structure that serves you with pregenerated values from your custom computation-intensive function. Getting those pregenerated values then boils down to a cheap `Array.prototype.pop`.

***

## Get it!

```
npm install --save pregen-stash
```

***

## Usage

``` js
const createStash = require('pregen-stash')

createStash(5, Math.random)
  .then(stash => {
    for (var i = 0; i < 13; i++) console.log(stash.pop(), stash.size)
  })
  .catch(console.error)
```

***

## API

### `createStash(size, gen)`

Create a new `Stash` instance. `size` indicates the number of items that should be kept readily available at any time. `gen` must be a function. Its return values will be used to reup the `stash`. `gen` must have arity 0. `createStash` returns a `Promise` that resolves to the `Stash` instance.

### `stash.pop()`

Retrieve the next item from your `stash` in FIFO fashion.

***

## License

[MIT](./license.md)
