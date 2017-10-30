import curry from 'lodash.curry'

/* eslint-disable standard/no-callback-literal */

function _notImplemented () {
  throw new Error(
    `Arrow is a abstract class, do not use it directly.
        Please use one of it's subclasses or create your own by
        overriding arr, next and first functions.`
  )
}

function swap ([x, y]) {
  return [y, x]
}

class Arrow {
  constructor (f) {
    this.f = curry(f)
  }

  static arr () { _notImplemented() }
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
    const f = this
    const swapA = f.constructor.arr(swap)

    return swapA.next(f.first()).next(swapA)
  }

  parallel (g) {
    const f = this
    return f.first().next(g.second())
  }

  both (g) {
    const f = this
    return f.constructor.arr(x => [x, x]).next(f.parallel(g))
  }
}

export default Arrow
