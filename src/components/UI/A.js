import React from 'react'
import {css} from 'aphrodite'
import {shell} from 'electron'
import styles from './AStyles'
const noop = () => {}

const A = React.createClass({
  getDefaultProps () {
    return {onClick: noop}
  },

  handleOnClick (e) {
    if (this.props.target === '_blank') {
      e.preventDefault()
      shell.openExternal(this.props.href)
    }
    this.props.onClick(e)
  },

  render () {
    const {externalStyles, className = '', children, ...other} = this.props

    return (
      <a className={`${className} ${css(styles().a, externalStyles)}`} {...other} onClick={this.handleOnClick}>{children}</a>
    )
  }
})

export default A
