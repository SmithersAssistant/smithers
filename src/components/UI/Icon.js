import React from 'react';
import cx from 'classnames';

const Icon = ({icon, className, ...other}) => (
  <span
    {...other}
    className={cx({
      [`fa fa-${icon}`]: true,
      [className]: !!className
    })}
  />
)

export default Icon
