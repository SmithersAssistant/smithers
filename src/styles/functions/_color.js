import Color from 'color'
import * as colors from './_colors'

export const rgba = (color, alpha) => Color(color).alpha(alpha).rgbString()
export const lighten = (color, percentage) => Color(color).lighten(percentage).hexString()
export const darken = (color, percentage) => Color(color).darken(percentage).hexString()

// Fetch a color from the Google Material colors
export const color = (color, weight = 500) => {
  if (colors[color] === undefined) {
    color = 'indigo'
  }

  return colors[color][weight] || colors[color][500]
}

export const isDarkColor = (color) => {
  let {r, g, b} = Color(color).rgb()

  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  return yiq >= 128
}

export const isLightColor = (color) => {
  return !isDarkColor(color)
}
