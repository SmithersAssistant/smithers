import React from 'react'
import styleFactory from './ColorPaletteStyles'

export default (robot) => {
  const {
    classNames,
    withStyles,

    colors,
    Icon
  } = robot.UI

  return withStyles(styleFactory(colors))(({ styles, activeColor, onChooseColor }) => {
    return (
      <div style={{
        display: 'inline-block',
        textAlign: 'center'
      }}>
        {Object.keys(colors).map(c => {
          return (
            <div
              key={c}
              onClick={() => {
                onChooseColor(c)
              }}
              className={classNames(
                styles[`circle_${c}`],
                styles.circle,
                activeColor === c
                  ? styles.active
                  : undefined
              )}
            >{activeColor === c ? (
              <Icon
                className={classNames(
                  styles.icon,
                  activeColor === c
                    ? styles[`activeIcon_${c}`]
                    : undefined
                )}
                icon='paint-brush'
              />
            ) : undefined}</div>
          )
        })}
      </div>
    )
  })
}
