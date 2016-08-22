export default ({StyleSheet, color, px, theme}) => {
  return StyleSheet.create({
    title: {
      padding: 0,
      margin: 0
    },
    titlePart: {
      display: 'inline-block',
      paddingLeft: 10,
      paddingRight: 10,
      borderRight: `1px solid ${color('grey', 300)}`
    },
    firstTitlePart: {
      paddingLeft: 0
    },
    lastTitlePart: {
      borderRight: 'none'
    },
    verboseModeBox: {
      padding: px(6, 12),
      fontSize: 12,
      color: color('grey', 100),
      borderRadius: 2,
      backgroundColor: color('grey', 800),
      lineHeight: 'normal',
      ...theme.shadow1
    },
    verboseModeAsInfo: {
      marginRight: -20,
      marginLeft: -20,
      marginBottom: -10,
      borderRadius: 0,
      boxShadow: 'none',
      maxHeight: 600,
      ...theme.scrollbar
    },
    boxHeight: {
      minHeight: 200,
      maxHeight: 600,
      ...theme.scrollBar
    },
    busyIcon: {
      float: 'right',
      color: 'whitesmoke',
      marginTop: 10
    },
    timing: {
      fontSize: 12,
      color: color('grey', 400),
      margin: px(0, 20),
      float: 'right'
    }
  })
}
