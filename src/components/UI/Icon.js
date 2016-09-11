import React from 'react'
import {classNames} from 'components/functions'

const Icon = ({icon, className, ...other}) => (
  <span
    {...other}
    className={classNames(`fa fa-${icon}`, className)}
  />
)

export default Icon
