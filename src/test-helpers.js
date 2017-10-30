import jsc from 'jsverify'

const check = (name, prop, t) => {
  const r = jsc.check(prop, { quiet: true })
  if (r === true) {
    t.pass(`${name} property holds`)
  } else {
    t.fail(`${name} property does not hold! found counter example: ${r.counterexamplestr}`)
  }
}

const arePairsEq = (p1, p2) => {
  return p1[0] === p2[0] && p1[1] === p2[1]
}

export default {
  check,
  arePairsEq
}
