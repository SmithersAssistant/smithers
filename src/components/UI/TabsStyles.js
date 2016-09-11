export default ({ theme, color }) => ({
  tabsBar: {
    backgroundColor: color(theme.primaryColor, 700),
    listStyle: 'none',
    paddingLeft: 0,
    margin: 0,
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    height: theme.tabHeight,
    '::-webkit-scrollbar': {
      display: 'none'
    }
  },
  tabsPane: {
    display: 'none',
    width: 0,
    height: 0
  },
  tabsPaneActive: {
    display: 'block',
    width: '100%',
    height: '100%'
  },
  tab: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: color(theme.primaryColor, 700)
  }
})
