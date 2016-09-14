import React from 'react'
import styleFactory from './ColorPaletteStyles'

export default (robot) => {
  const {
    classNames,
    withStyles,

    colors,
    Icon
  } = robot.UI

  const ColorPalette = ({ styles, activeColor, onChooseColor }) => {
    return (
      <div className={styles.wrapper}>
        {Object.keys(colors).map(c => {
          if (['gray', 'blueGray'].includes(c)) {
            return
          }

          return (
            <div
              key={c}
              onClick={() => {
                onChooseColor(c)
              }}
              className={classNames(
                styles[`color_${c}`],
                styles.color
              )}
            >
              <span
                className={classNames(
                  styles.name,
                  styles[`activeIcon_${c}`],
                  styles[`name_${c}`]
                )}
              >{c.toUpperCase()}</span>
              {activeColor === c && (
                <Icon
                  className={classNames(
                    styles.icon,
                    activeColor === c
                      ? styles[`activeIcon_${c}`]
                      : undefined
                  )}
                  icon='check'
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return withStyles(styleFactory(colors))(ColorPalette)
}
