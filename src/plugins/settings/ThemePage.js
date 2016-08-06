import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import cx from 'classnames';

export default (robot) => {

  const {
    theme,

    color,
    colors,
    Icon,
  } = robot.UI

  const staticStyles = StyleSheet.create({
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
      },
    },
    icon: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    },
  });

  const styles = (currentColor, hasShadow) => StyleSheet.create({
    circle: {
      backgroundColor: color(currentColor)
    },
    active: {
      ...(hasShadow ? theme.shadow3 : {})
    },
    activeIcon: {
      color: color(currentColor, 200)
    }
  });
  
  return ({state, setState}) => {
    return (
      <div style={{
        display: 'inline-block',
        textAlign: 'center'
      }}>
        {Object.keys(colors).map(c => {
          const style = styles(c, state.activeColor === c);

          return (
            <div
              key={c}
              onClick={() => {
                setState({activeColor: c})
                robot.setTheme(c)
              }}
              className={cx({
                [css(staticStyles.circle)]: true,
                [css(style.circle)]: true,
                [css(style.active)]: state.activeColor === c
              })}
            >{state.activeColor === c ? (
              <Icon
                className={cx({
                  [css(staticStyles.icon)]: true,
                  [css(style.activeIcon)]: state.activeColor === c,
                })}
                icon="paint-brush"
              />
            ) : undefined}</div>
          )
        })}
      </div>
    )
  }
}
