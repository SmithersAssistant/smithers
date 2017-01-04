export default ({ theme, px, sum }) => ({
  cardHeader: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    paddingLeft: theme.cardHeaderPaddingLeft,
    borderBottom: '1px solid whitesmoke',
    borderRadius: '3px 3px 0 0',
    backgroundColor: theme.cardBackground
  },
  cardHeaderTitle: {
    height: px(theme.cardHeaderHeight),
    lineHeight: px(theme.cardHeaderHeight),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: `calc(100vw - ${px(sum(
      (theme.cardHeaderHeight * 1), // Space for 1 icon-button(s) on the right side
      theme.cardHeaderPaddingLeft, // Padding on the left, should also be on the right
      (2 * theme.cardSpace), // padding for both sides
      10 // the width of the scrollbar
    ))})`,
    ...theme.left
  },
  right: {
    ...theme.right
  }
})
