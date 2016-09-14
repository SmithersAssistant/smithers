const COLUMNS = 5
const HEIGHT = 100
const SPACE = 10

export default (colors) => ({ px, isDarkColor, color }) => {
  const styles = {
    wrapper: {
      display: 'inline-block',
      textAlign: 'center',
      margin: px(SPACE, 0)
    },
    color: {
      float: 'left',
      display: 'inline-block',
      width: `calc((100vw - 130px) / ${COLUMNS})`,
      height: HEIGHT,
      position: 'relative',
      margin: 2
    },
    icon: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      marginTop: SPACE * -1,
      fontSize: 20
    },
    name: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      padding: px(SPACE / 2, SPACE),
      textAlign: 'left'
    }
  }

  Object.keys(colors).forEach(c => {
    if (['gray', 'blueGray'].includes(c)) {
      return
    }

    const nameBackgorund = color(c, 600)

    styles[`color_${c}`] = {
      backgroundColor: color(c)
    }

    styles[`name_${c}`] = {
      backgroundColor: nameBackgorund
    }

    styles[`activeIcon_${c}`] = {
      fontWeight: 300,
      opacity: 0.8,
      color: isDarkColor(nameBackgorund)
        ? '#3e464c'
        : 'white'
    }
  })

  return styles
}
