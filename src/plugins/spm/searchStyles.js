const gap = 16

export default ({ px, color, important }) => ({
  wrapper: {
    margin: 0,
    marginTop: 20 + gap,
    padding: 0,
    columnCount: 3,
    columnGap: gap,
    '@media (max-width: 1200px)': {
      columnCount: 2
    },
    '@media (max-width: 800px)': {
      columnCount: 1
    }
  },
  clean: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: gap,
    pointerEvents: 'none',
    border: '1px solid #d9d9d9'
  },
  item: {
    listStyle: 'none',
    position: 'relative',
    pageBreakInside: 'avoid',
    WebkitColumnBreakInside: 'avoid',
    breakInside: 'avoid',
    paddingBottom: gap
  },
  contents: {
    padding: gap
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: 49,
    borderBottom: `1px solid ${color('grey', 200)}`,
    color: 'rgba(0, 0, 0, 0.541176)',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: px(48),
    paddingLeft: gap
  },
  description: {
    marginTop: 0
  },
  keywords: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    display: 'inline-block',
    height: 22,
    whiteSpace: 'nowrap'
  },
  keyword: {
    color: color('grey'),
    padding: px(4, 2),
    fontSize: 12,
    marginRight: 3,
    display: 'inline-block',
    ':hover': {
      color: color('grey', 400)
    }
  },
  authorImage: {
    width: 24,
    height: 24,
    backgroundColor: color('grey'),
    lineHeight: px(24),
    marginRight: gap / 2,
    verticalAlign: 'middle',
    borderRadius: '50%'
  },
  actions: {
    position: 'absolute',
    right: 16,
    bottom: 36,
    paddingLeft: 3,
    backgroundColor: 'white'
  },
  action: {
    backgroundColor: color('grey', 100),
    padding: px(4, 8),
    fontSize: 12,
    marginRight: 3,
    borderRadius: 2,
    display: 'inline-block',
    float: 'right'
  },
  version: {
    float: 'right',
    color: color('grey', 400),
    fontSize: 12,
    marginRight: gap,
    fontWeight: 200
  },
  badge: {
    float: 'right',
    color: color('grey', 400),
    fontSize: 12,
    marginRight: gap,
    fontWeight: 200
  },
  readme: {
    marginTop: 20
  },
  filters: {
    height: 24,
    lineHeight: px(24),
    display: 'inline-flex',
    verticalAlign: 'middle'
  },
  filter: {
    display: 'inline-flex',
    marginLeft: gap,
    whiteSpace: 'nowrap',
    width: important(px(100))
  }
})
