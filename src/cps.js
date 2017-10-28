import Arrow from './arrow'

class CPS extends Arrow {
  static arr (f) {
    return new CPS((v, cb) => {
      f(v, u => {
        cb(u)
      })
    })
  }

  next (gA) {
    const f = this.f
    const g = gA.f
    return new CPS((v, cb) => {
      f(v, u => {
        const w = g(u)
        cb(w)
        return w
      })
    })
  }

  first () {
    const f = this.f
    return CPS((pair, cb) => {
      return f(pair[0], u => {
        const w = [u, pair[1]]
        cb(w)
        return w
      })
    })
  }
}

export default CPS
