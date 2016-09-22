import React from 'react'
import Base from './Base'
import styles from './_styles'
import {withStyles, classNames} from 'components/functions'

const Images = ({title, images, className, ...other}) => (
  <Base
    {...other}
    title={title}
    className={classNames(styles.cardStyles, styles.itemStyles, className)}
  >
    <ul className={styles.cardImagesStyles}>
      <div className={styles.imagesStyles}>
        {images && images.map((img, i) => {
          return typeof img === 'string'
            ? <img className={styles.imgStyles} key={i} src={img} />
            : <img className={styles.imgStyles} key={i} alt={img.title} title={img.title} src={img.src} />
        })}
      </div>
    </ul>
  </Base>
)

export default withStyles(styles)(Images)
