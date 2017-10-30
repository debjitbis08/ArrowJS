import test from 'tape'
import Fn from './fn'
import U from './util'
import jsc from 'jsverify'
import TestHelpers from './test-helpers'

test('Arrow laws for Fn', t => {
  t.plan(8)

  // arr id = id
  TestHelpers.check('Identity', jsc.forall(jsc.nat, a => Fn.arr(x => x).run(a) === Fn.id.run(a)), t)

  // (f >>> g) >>> h = f >>> (g >>> h)
  TestHelpers.check(
    'Composition is associative',
    jsc.forall(
      'nat -> nat', 'nat -> nat', 'nat -> nat', 'nat',
      (f, g, h, n) => {
        const fA = Fn.arr(f)
        const gA = Fn.arr(g)
        const hA = Fn.arr(h)

        return U.pipe(U.pipe(fA, gA), hA).run(n) === U.pipe(fA, U.pipe(gA, hA)).run(n)
      }
    ),
    t
  )

  // arr (f >>> g) = arr f >>> arr g
  TestHelpers.check(
    'Composition preserved by arr',
    jsc.forall(
      'nat -> nat', 'nat -> nat', 'nat',
      (f, g, n) => Fn.arr(U.pipe(f, g)).run(n) === U.pipe(Fn.arr(f), Fn.arr(g)).run(n)
    ),
    t
  )

  // first (arr f) = arr (first f)
  TestHelpers.check(
    'Combinators behave for pure arrows as they do for functions',
    jsc.forall(
      'nat -> nat', 'nat & nat',
      (f, pair) => {
        const firstResult = Fn.arr(f).first().run(pair)
        const secondResult = Fn.arr(p => [f(p[0]), p[1]]).run(pair)
        return firstResult[0] === secondResult[0] && firstResult[1] === secondResult[1]
      }
    ),
    t
  )

  // first (f >>> g) = first f >>> first g
  TestHelpers.check(
    '`first` preserves composition',
    jsc.forall(
      'nat -> nat', 'nat -> nat', 'nat & nat',
      (f, g, p) => {
        const fA = Fn.arr(f)
        const gA = Fn.arr(g)
        return TestHelpers.arePairsEq(
          U.first(U.pipe(fA, gA)).run(p),
          U.pipe(U.first(fA), U.first(gA)).run(p)
        )
      }
    ),
    t
  )

  // first f >>> arr fst = arr fst >>> f
  TestHelpers.check(
    'first f depends only on first component of pair',
    jsc.forall(
      'nat -> nat', 'nat & nat',
      (f, p) => TestHelpers.arePairsEq(
        U.pipe(U.first(Fn.arr(f)), Fn.arr(pr => pr[0])).run(p),
        U.pipe(Fn.arr(pr => pr[0]), Fn.arr(f)).run(p)
      )
    ),
    t
  )

  // first (first f) >>> arr assoc = arr assoc >>> first f
  TestHelpers.check(
    'first of first',
    jsc.forall(
      'nat -> nat', 'nat & nat', 'nat',
      (f, p, n) => {
        const assoc = pp => [pp[0][0], [pp[0][1], pp[1]]]
        const firstRes = U.pipe(U.first(U.first(Fn.arr(f))), Fn.arr(assoc)).run([p, n])
        const secondRes = U.pipe(Fn.arr(assoc), U.first(Fn.arr(f))).run([p, n])

        return firstRes[0] === secondRes[0] && TestHelpers.arePairsEq(firstRes[1], secondRes[1])
      }
    ),
    t
  )

  // first f >>> arr (id *** g) = arr (id *** g) >>> first f
  TestHelpers.check(
    'Some law',
    jsc.forall(
      'nat -> nat', 'nat -> nat', 'nat & nat',
      (f, g, p) => {
        const fA = Fn.arr(f)
        const gA = Fn.arr(g)
        const lhs = U.pipe(U.first(fA), U.parallel(Fn.id, gA)).run(p)
        const rhs = U.pipe(U.parallel(Fn.id, gA), U.first(fA)).run(p)

        return TestHelpers.arePairsEq(lhs, rhs)
      }
    ),
    t
  )
})
