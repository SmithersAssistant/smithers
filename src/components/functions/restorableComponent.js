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
      super.componentDidMount(...args)
      this.props.setState(this.state)
    }

    setState (state = {}, cb = () => {}) {
      super.setState(state, cb)
      this.props.setState(state)
    }
  }

  return EnhancedClass
}
