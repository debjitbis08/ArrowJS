import assert from 'assert'
import Arrow from './arrow'
import flow from 'lodash.flow'
import Fn from './fn'

const pipe = (...fns) => {
  const areAllFns = fns.every(f => typeof f === 'function')
  const areAllArrows = fns.every(f => f instanceof Arrow)

  assert(areAllFns || areAllArrows, 'Arrow: pipe requires all arguments to be functions or arrows.')

  if (areAllFns) {
    return flow(fns)
  }
  return fns.reduce((result, fn) => result.next(fn))
}

const compose = (...fns) => {
  const areAllFns = fns.every(f => typeof f === 'function')
  const areAllArrows = fns.every(f => f instanceof Arrow)

  assert(areAllFns || areAllArrows, 'Arrow: compose requires all arguments to be functions or arrows.')

  if (areAllFns) {
    return flow(fns.reverse())
  }
  return fns.reverse().reduce((result, fn) => result.next(fn))
}

const first = f => {
  assert(
    typeof f === 'function' || f instanceof Arrow,
    'Arrow: first requires first parameter to be either a function or an Arrow instance'
  )

  if (typeof f === 'function') {
    return Fn.arr(p => [f(p[0]), p[1]])
  }
  return f.first()
}

const second = f => {
  assert(
    typeof f === 'function' || f instanceof Arrow,
    'Arrow: second requires first parameter to be either a function or an Arrow instance'
  )

  if (typeof f === 'function') {
    return Fn.arr(p => [p[0], f(p[1])])
  }
  return f.second()
}

const parallel = (f, g) => {
  assert(
    (typeof f === 'function' && typeof g === 'function') ||
    (f instanceof Arrow && g instanceof Arrow),
    'Arrow: parallel requires first & second parameters to be either functions or Arrow instances'
  )

  if (typeof f === 'function' && typeof g === 'function') {
    return Fn.arr(p => [f(p[0]), g(p[1])])
  }
  return f.parallel(g)
}

export default { pipe, compose, first, second, parallel }
