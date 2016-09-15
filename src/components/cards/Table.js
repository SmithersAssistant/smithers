import React from 'react'
import Base from './Base'

import {cardStyles, itemStyles} from './_styles'

const tableStyles = {
  width: '100%',
  maxWidth: '100%',
  backgroundColor: 'white',
  borderRadius: 3,
  tableLayout: 'fixed',
  borderSpacing: 0
}

const tbodyStyles = {
  borderTop: '1px solid rgba(0, 0, 0, 0.12)'
}

const cellStyles = {
  padding: '20px 25px',
  verticalAlign: 'middle',
  borderTop: 0,
  overflow: 'hidden',
  transition: 'all 0.3s ease'
}

const tbodyCellStyles = {
  ...cellStyles,
  fontSize: '13px',
  color: 'rgba(0, 0, 0, .87)'
}

const trStyles = {
  minHeight: 54
}

const tbodyCellHeaderStyles = {
  fontSize: '12px',
  color: 'rgba(0, 0, 0, .54)',
  verticalAlign: 'middle',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  lineHeight: '14px'
}

class Table extends React.Component {
  static defaultProps = {
    title: undefined,
    header: [],
    body: [],
    footer: []
  };

  render () {
    const {title, header, body, footer, ...other} = this.props

    return (
      <Base {...other} title={title} style={{...cardStyles, ...itemStyles}}>
        <table style={tableStyles}>
          <tbody style={tbodyStyles}>
          {header && (
            <tr style={trStyles}>
              {header.map((item, i) => {
                if (item.hasOwnProperty('value')) {
                  return <td style={{...tbodyCellStyles, ...tbodyCellHeaderStyles}}
                    key={`header_${i}`} {...item}>{item.value}</td>
                }

                return <td style={{...tbodyCellStyles, ...tbodyCellHeaderStyles}} key={`header_${i}`}>{item}</td>
              })}
            </tr>
          )}

          {body && body.map((row, rowIndex) => (
            <tr style={trStyles} key={`body_row_${rowIndex}`}>
              {row.map((cell, i) => (
                <td style={tbodyCellStyles} key={`body_${rowIndex}_${i}`}>{cell}</td>
              ))}
            </tr>
          ))}
          </tbody>
          {footer && (
            <tfoot>
              <tr style={trStyles}>
                {footer.map((item, i) => {
                  if (item.hasOwnProperty('value')) {
                    return <td style={cellStyles} key={`footer_${i}`} {...item}>{item.value}</td>
                  }

                  return <td style={cellStyles} key={`footer_${i}`}>{item}</td>
                })}
              </tr>
            </tfoot>
          )}
        </table>
      </Base>
    )
  }
}

export default Table
