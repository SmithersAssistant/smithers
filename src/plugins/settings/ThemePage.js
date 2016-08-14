import React from 'react'
import colorPaletteFactory from './ColorPalette'

export default (robot) => {
  const ColorPalette = colorPaletteFactory(robot)

  return ({state, setState}) => {
    return (
      <div>
        <h3>Primary Color</h3>
        <ColorPalette
          activeColor={state.primaryColor}
          onChooseColor={(color) => {
            setState({primaryColor: color})
            robot.setPrimaryColor(color)
          }}
        />

        <h3>Secondary Color</h3>
        <ColorPalette
          activeColor={state.secondaryColor}
          onChooseColor={(color) => {
            setState({secondaryColor: color})
            robot.setSecondaryColor(color)
          }}
        />
      </div>
    )
  }
}
