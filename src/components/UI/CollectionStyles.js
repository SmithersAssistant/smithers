export default ({theme, px, rgba}) => ({
  collectionStyles: {
    display: 'block',
    listStyleType: 'none',
    padding: 0,
    margin: '0.5rem 0 1rem 0',
    borderRadius: '2px',
    overflowY: 'auto',
    ...theme.shadow1
  },
  collectionItemStyles: {
    backgroundColor: 'white',
    lineHeight: '1.9rem',
    padding: px(10, 20),
    margin: 0,
    borderBottom: '1px solid #e0e0e0',
    color: rgba('#000', 0.87)
  }
})
