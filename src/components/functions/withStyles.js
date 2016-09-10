import React from 'react'
import {StyleSheet, css} from 'aphrodite'
import {theme, color, px} from 'styles/theme'

export default (cb = {}) => {
  const styles = typeof cb === 'function'
    ? cb({theme, color, px}) || {}
    : cb || {}

  const computedStyles = StyleSheet.create(styles)
  const classNames = {}

  Object.keys(styles).forEach(className => {
    classNames[className] = css(computedStyles[className])
  })

  return Component => props => (
    <Component
      styles={classNames}
      {...props}
    />
  )
}
