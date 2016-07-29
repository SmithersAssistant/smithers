import React from 'react'
import CheckBoxField from 'material-ui/Checkbox';
import themeFactory, {color} from 'styles/theme';

const Field = (props) => (
  <CheckBoxField
    iconStyle={{
            fill: color(themeFactory().colorTheme)
        }}
    {...props}
  />
)

export default Field
