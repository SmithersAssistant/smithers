import React from 'react'
import {shell} from 'electron'
import styles from './AStyles'
import {withStyles, classNames} from 'components/functions'
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
    const {styles, className, children, ...other} = this.props

    return (
      <a
        {...other}
        className={classNames(styles.a, className)}
        onClick={this.handleOnClick}
      >{children}</a>
    )
  }
})

export default withStyles(styles)(A)
