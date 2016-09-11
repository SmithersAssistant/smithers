export default ({ theme, color }) => ({
  a: {
    color: color(theme.primaryColor, 500),
    textDecoration: 'none',
    ':hover': {
      color: color(theme.primaryColor, 300),
      textDecoration: 'none'
    }
  }
})
