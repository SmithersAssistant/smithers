import React from 'react'
import Base from './Base'

import { card, item } from './_styles'

const table = {
  width: '100%',
  maxWidth: '100%',
  backgroundColor: 'white',
  borderRadius: 3,
  tableLayout: 'fixed',
  borderSpacing: 0
}

const tbody = {
  borderTop: '1px solid rgba(0, 0, 0, 0.12)'
}

const cell = {
  padding: '20px 25px',
  verticalAlign: 'middle',
  borderTop: 0,
  overflow: 'hidden',
  transition: 'all 0.3s ease'
}

const tbodyCell = {
  ...cell,
  fontSize: '13px',
  color: 'rgba(0, 0, 0, .87)'
}

const tr = {
  minHeight: 54
}

const tbodyCellHeader = {
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
      <Base {...other} title={title} style={{...card, ...item}}>
        <table style={table}>
          <tbody style={tbody}>
            {header && (
              <tr style={tr}>
                {header.map((item, i) => {
                  if (item.hasOwnProperty('value')) {
                    return <td style={{...tbodyCell, ...tbodyCellHeader}}
                      key={`header_${i}`} {...item}>{item.value}</td>
                  }

                  return <td style={{...tbodyCell, ...tbodyCellHeader}} key={`header_${i}`}>{item}</td>
                })}
              </tr>
            )}

            {body && body.map((row, rowIndex) => (
              <tr style={tr} key={`body_row_${rowIndex}`}>
                {row.map((cell, i) => (
                  <td style={tbodyCell} key={`body_${rowIndex}_${i}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
          {footer && (
            <tfoot>
              <tr style={tr}>
                {footer.map((item, i) => {
                  if (item.hasOwnProperty('value')) {
                    return <td style={cell} key={`footer_${i}`} {...item}>{item.value}</td>
                  }

                  return <td style={cell} key={`footer_${i}`}>{item}</td>
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
