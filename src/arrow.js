import curry from 'lodash.curry'

function _notImplemented () {
  throw new Error(
    `Arrow is a abstract class, do not use it directly.
        Please use one of it's subclasses or create your own by
        overriding arr, next and first functions.`
  )
}

class Arrow {
  constructor (f) {
    this.f = curry(f)
  }

  arr () { _notImplemented() }
  next () { _notImplemented() }
  first () { _notImplemented() }

  run () {
    const a = this
    const args = Array.prototype.slice.call(arguments, 0)
    return a.f.apply(a, args)
  }

  /** Extra Functions **/

  /**
     * @function second
     * @return {Arrow}
     */
  second () {
    const a = this
    const swapA = a.arr(function (pair, cb) {
      cb([pair[1], pair[0]])
    })
    return swapA.next(a.first()).next(swapA)
  }

  parallel (g) {
    const f = this
    return f.first().next(g.second())
  }

  both (g) {
    const f = this
    return f.arr(function (b, cb) {
      cb([b, b])
    }).next(f.parallel(g))
  }
}

export default Arrow
