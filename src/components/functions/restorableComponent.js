const NOOP = () => {}

export default (Component) => {
  class EnhancedClass extends Component {
    constructor (...args) {
      super(...args)

      this.state = {
        ...this.state,
        ...this.props.getState()
      }
    }

    componentDidMount (...args) {
      (super.componentDidMount || NOOP).bind(this)(...args)

      this.props.setState(this.state)
    }

    setState (state = {}, cb = () => {}) {
      super.setState(state, cb)
      this.props.setState(state)
    }
  }

  return EnhancedClass
}
