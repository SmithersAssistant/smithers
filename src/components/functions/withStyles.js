import React from 'react'
import {StyleSheet, css} from 'aphrodite/no-important'
import * as functions from 'styles/functions'
import {theme} from 'styles/theme'

export default (cb = {}) => {
  const styles = typeof cb === 'function'
    ? cb({theme, ...functions}) || {}
    : cb || {}

  const computedStyles = StyleSheet.create(styles)
  const classNames = Object.keys(styles).reduce((classNames, className) => {
    return {
      ...classNames,
      [className]: css(computedStyles[className])
    }
  }, {})

  return Component => (props = {}) => {
    return (
      <Component
        {...props}
        styles={{
          ...classNames,
          ...(props.styles || {})
        }}
      />
    )
  }
}
