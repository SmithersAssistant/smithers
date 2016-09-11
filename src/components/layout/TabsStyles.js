export default ({theme, sum, px}) => ({
  outputStyles: {
    width: '100%',
    height: `calc(100vh - ${px(sum(theme.inputHeight, theme.headerOffset, theme.tabHeight, theme.footerHeight))})`,
    position: 'relative',
    ...theme.scrollBar
  }
})
