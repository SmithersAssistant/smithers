import {getPrimaryColor, getSecondaryColor} from 'state'
import {color, rgba} from './functions'
export * from './functions'
import os from 'os'

const inputBar = colorTheme => ({
  barBackgroundColor: color(colorTheme, 700),
  barBorderColor: color(colorTheme, 400)
})

const shadows = {
  shadow1: {
    boxShadow: [
      '0 1px 3px rgba(0, 0, 0, 0.12)',
      '0 1px 2px rgba(0, 0, 0, 0.24)'
    ].join(', ')
  },
  shadow2: {
    boxShadow: [
      '0 3px 6px rgba(0, 0, 0, 0.16)',
      '0 3px 6px rgba(0, 0, 0, 0.23)'
    ].join(', ')
  },
  shadow3: {
    boxShadow: [
      '0 10px 20px rgba(0, 0, 0, 0.19)',
      '0 6px 6px rgba(0, 0, 0, 0.23)'
    ].join(', ')
  },
  shadow4: {
    boxShadow: [
      '0 14px 28px rgba(0, 0, 0, 0.25)',
      '0 10px 10px rgba(0, 0, 0, 0.22)'
    ].join(', ')
  },
  shadow5: {
    boxShadow: [
      '0 19px 38px rgba(0, 0, 0, 0.30)',
      '0 15px 12px rgba(0, 0, 0, 0.22)'
    ].join(', ')
  }
}

const colors = colorTheme => ({
  backgroundColor: 'whitesmoke',
  color: color('grey', 600),
  disabled: color('grey', 400),
  ...inputBar(colorTheme)
})

const sizes = {
  padding: 30,
  inputHeight: 46,
  headerOffset: os.type() === 'Darwin' ? 34 : 0, // 34 on mac
  tabHeight: 48,
  footerHeight: (30 * 1.8)
}

const fonts = {
  fontSize: 16,
  fontWeight: 300
}

const card = {
  cardBackground: 'white',
  cardHeaderHeight: 48,
  cardHeaderPaddingLeft: 12,
  cardSpace: 20
}

const helpers = {
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  left: {
    float: 'left'
  },
  right: {
    float: 'right'
  },
  scrollBar: {
    overflowY: 'scroll',
    '::-webkit-scrollbar': {
      width: 10,
      backgroundColor: rgba('#E0E0E0', 0.6),
      borderRadius: 0,
      borderLeft: '1px solid transparant'
    },
    '::-webkit-scrollbar:hover': {
      backgroundColor: rgba('#000', 0.09)
    },
    '::-webkit-scrollbar-thumb:vertical': {
      background: rgba('#000', 0.5),
      borderRadius: 100
    },
    '::-webkit-scrollbar-thumb:vertical:active': {
      background: rgba('#000', 0.61),
      borderRadius: 100
    }
  }
}

const themeFactory = (primaryColor = getPrimaryColor(), secondaryColor = getSecondaryColor()) => ({
  primaryColor,
  secondaryColor,
  ...colors(primaryColor),
  ...fonts,
  ...sizes,
  ...card,
  ...helpers,
  ...shadows
})

export const theme = themeFactory()
export default themeFactory
