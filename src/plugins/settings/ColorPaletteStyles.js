export default (colors) => ({ theme, color }) => {
  const styles = {
    circle: {
      display: 'inline-block',
      margin: 25,
      width: 45,
      height: 45,
      borderRadius: '50%',
      position: 'relative',
      transition: 'box-shadow ease-in-out .3s',
      ':hover': {
        ...theme.shadow2
      }
    },
    icon: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    },
    active: {
      ...theme.shadow3
    }
  }

  Object.keys(colors).forEach(c => {
    styles[`circle_${c}`] = {
      backgroundColor: color(c)
    }

    styles[`activeIcon_${c}`] = {
      color: color(c, 200)
    }
  })

  return styles
}
