import test from 'tape'
import A from '../src/main'

// TODO Replace with laws
test('Basic test (temporary)', function (t) {
  t.plan(5)

  const addOne = v => v + 1
  const sqr = v => v * v
  const asyncSqr = (v, cb) => {
    setTimeout(() => cb(sqr(v)), 100)
  }

  t.equal(A.FnA(addOne).next(A.FnA(sqr)).run(2), 9)

  A.CpsA(asyncSqr).next(A.FnA(addOne)).run(2)(v => {
    t.equal(v, 5)
  })

  A.FnA(addOne).next(A.CpsA(asyncSqr)).run(2)(v => {
    t.equal(v, 9)
  })

  A.pipe(
    A.FnA(addOne),
    A.CpsA(asyncSqr)
  ).run(2)(v => {
    t.equal(v, 9)
  })

  A.compose(
    A.CpsA(asyncSqr),
    A.FnA(addOne)
  ).run(2)(v => {
    t.equal(v, 9)
  })
})
