import mapValues from 'lodash/mapValues'

import {dispatch} from 'store'
import * as actions from 'actions/index'

export default mapValues(actions, action => (...args) => dispatch(action(...args)))
