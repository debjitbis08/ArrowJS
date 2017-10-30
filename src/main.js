import Arrow from './arrow'
import Fn from './fn'
import CPS from './cps'
import U from './util'

const FnA = Fn.arr.bind(Fn)
const CpsA = CPS.arr.bind(CPS)

export default {
  Arrow,
  FnA,
  CpsA,
  compose: U.compose,
  pipe: U.pipe,
  first: U.first
}
