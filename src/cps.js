import Arrow from './arrow'
import flow from 'lodash.flow'

class CPS extends Arrow {
  static arr (f) {
    return new CPS((v, cb) => {
      f(v, cb)
    })
  }

  next (gA) {
    const f = this.f
    const g = gA.f
    return new CPS((v, cb) => f(v, flow(cb, g)))
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
