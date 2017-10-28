import test from 'tape'
import A from '../src/main'

// TODO Replace with laws
test('Basic test (temporary)', function (t) {
  t.plan(2)

  const addOne = v => v + 1
  const sqr = v => v * v
  const asyncSqr = (v, cb) => {
    setTimeout(() => cb(sqr(v)), 100)
  }


  A.CPS.arr(asyncSqr).next(A.Fn.arr(addOne)).run(2)(v => {
    t.equal(v, 5)
  })

  A.Fn.arr(addOne).next(A.CPS.arr(asyncSqr)).run(2)(v => {
    t.equal(v, 9)
  })
})
