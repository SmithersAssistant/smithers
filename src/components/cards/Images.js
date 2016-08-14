import React from 'react'
import Base from './Base'
import {StyleSheet, css} from 'aphrodite'
import {cardStyles, itemStyles} from './_styles'

const cardImagesStyles = {
  margin: 0,
  padding: 0
}

const gap = 10

const styles = StyleSheet.create({
  imagesStyles: {
    lineHeight: 0,
    columnCount: 5,
    columnGap: gap,
    '@media (max-width: 1200px)': {
      columnCount: 4
    },
    '@media (max-width: 1000px)': {
      columnCount: 3
    },
    '@media (max-width: 800px)': {
      columnCount: 2
    },
    '@media (max-width: 400px)': {
      columnCount: 1
    }
  }
})

const imgStyles = {
  width: '100%',
  height: 'auto',
  margin: [(gap / 2), 0].map(i => `${i}px`).join(' ')
}

const Images = ({title, images, ...other}) => (
  <Base {...other} title={title} style={{...cardStyles, ...itemStyles}}>
    <ul style={cardImagesStyles}>
      <div className={css(styles.imagesStyles)}>
        {images && images.map((img, i) => {
          if (typeof img === 'string') {
            return (
              <img style={imgStyles} key={i} src={img} />
            )
          } else {
            return (
              <img style={imgStyles} key={i} alt={img.title} title={img.title} src={img.src} />
            )
          }
        })}
      </div>
    </ul>
  </Base>
)

export default Images
