import React from 'react'
import Base from './Base'
import styles from './_styles'
import {withStyles, classNames} from 'components/functions'

const Images = ({title, images, className, styles, ...other}) => (
  <Base
    {...other}
    title={title}
    className={classNames(styles.card, styles.item, className)}
  >
    <ul className={styles.cardImages}>
      <div className={styles.images}>
        {images && images.map((img, i) => {
          return typeof img === 'string'
            ? <img className={styles.img} key={i} src={img} />
            : <img className={styles.img} key={i} alt={img.title} title={img.title} src={img.src} />
        })}
      </div>
    </ul>
  </Base>
)

export default withStyles(styles)(Images)
