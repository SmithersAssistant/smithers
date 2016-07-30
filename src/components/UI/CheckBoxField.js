import React from 'react'
import CheckBoxField from 'material-ui/Checkbox';
import {theme, color} from 'styles/theme';

const Field = (props) => (
  <CheckBoxField
    iconStyle={{
      fill: color(theme.colorTheme)
    }}
    {...props}
  />
)

export default Field
