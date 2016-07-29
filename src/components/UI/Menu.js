import React from 'react'

import IconMenu from 'material-ui/IconMenu'
import MaterialUIMenuItem from 'material-ui/MenuItem'
import MaterialUIMenuDivider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

export const MenuItem = MaterialUIMenuItem
export const MenuDivider = MaterialUIMenuDivider
export const Menu = ({children, icon, ...other}) => {
  const Icon = icon || MoreVertIcon

  return (
    <IconMenu
      {...other}
      iconButtonElement={<IconButton><Icon/></IconButton>}
    >
      {children}
    </IconMenu>
  )
}

export default Menu
