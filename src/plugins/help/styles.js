const gap = 16

export default (robot) => ({ color, px, important }) => ({
  wrapper: {
    margin: 0,
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
  plugin: {
    position: 'relative',
    pageBreakInside: 'avoid',
    WebkitColumnBreakInside: 'avoid',
    breakInside: 'avoid',
    paddingBottom: important(px(gap))
  },
  pluginTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: 49,
    borderBottom: `1px solid ${color('grey', 200)}`
  },
  command: {
    cursor: 'default',
    ':hover': {
      backgroundColor: color('grey', 100)
    }
  },
  argument: {
    borderBottom: `2px solid ${color(robot.getPrimaryColor())}`,
    borderRadius: 3,
    padding: px(0, 4)
  },
  optional: {
    borderBottom: `2px solid ${color(robot.getPrimaryColor(), 100)}`,
    borderRadius: 3,
    padding: px(0, 4)
  },
  item: {
    marginRight: 4
  },
  versionNumber: {
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
  }
})
