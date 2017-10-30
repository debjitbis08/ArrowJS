import Arrow from './arrow'
import flow from 'lodash.flow'

class Fn extends Arrow {
  static arr (f) {
    return new Fn(f)
  }

  next (gA) {
    const f = this.f
    const g = gA.f
    return new Fn(flow(f, g)) // g(f(x))
  }

  first () {
    const f = this.f
    return new Fn(pair => [f(pair[0]), pair[1]])
  }
}

Fn.id = new Fn(x => x)

export default Fn
