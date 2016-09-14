import {
  enhance,
  restorableComponent,
  withStyles
} from 'components/functions'

const enhancers = {
  withStyles,
  restorableComponent
}

export default {
  enhance,
  ...enhancers,
  enhancers
}
