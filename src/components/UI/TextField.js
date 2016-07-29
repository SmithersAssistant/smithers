import React from 'react'
import TextField from 'material-ui/TextField';
import themeFactory, {color} from 'styles/theme';

const Field = (props) => (
  <TextField
    underlineFocusStyle={{
      borderColor: color(themeFactory().colorTheme)
    }}
    floatingLabelStyle={{
      color: color(themeFactory().colorTheme)
    }}
    {...props}
  />
)

export default Field
