import React from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import themeFactory, {color} from 'styles/theme';

const Field = ({children, ...other}) => (
  <SelectField
    underlineFocusStyle={{
      borderColor: color(themeFactory().colorTheme)
    }}
    floatingLabelStyle={{
      color: color(themeFactory().colorTheme)
    }}
    children={children.map(({ name, value, ...childProps }) => (
      <MenuItem primaryText={name} key={name} value={value} {...childProps}/>
    ))}
    {...other}
  />
)

export default Field
