import React from 'react'
import TextField from 'material-ui/TextField';
import {theme, color} from 'styles/theme';

const Field = (props) => (
  <TextField
    underlineFocusStyle={{
      borderColor: color(theme.colorTheme)
    }}
    floatingLabelStyle={{
      color: color(theme.colorTheme)
    }}
    {...props}
  />
)

export default Field
