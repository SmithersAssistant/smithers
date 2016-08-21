import React from 'react'
import {findDOMNode} from 'react-dom'

const PinToBottom = React.createClass({
  getDefaultProps () {
    return {
      buffer: 50
    }
  },

  componentWillUpdate () {
    const node = findDOMNode(this)
    const {scrollHeight, clientHeight, scrollTop} = node
    const {buffer} = this.props
    this.pinToBottom = clientHeight + scrollTop + buffer >= scrollHeight
  },

  componentDidUpdate () {
    if (this.pinToBottom) {
      const node = findDOMNode(this)
      node.scrollTop = node.scrollHeight
    }
  },

  render () {
    return React.Children.only(this.props.children)
  }
})

export default PinToBottom
