export default ({ px, color, important }) => ({
  info: {
    fontSize: 12,
    position: 'absolute',
    top: 0,
    right: 20,
    height: 48,
    lineHeight: px(48),
    color: color('grey')
  },
  pluginItem: {
    position: 'relative',
    height: 48
  },
  removePluginButton: {
    position: important('absolute'),
    top: 0,
    right: 65
  }
})
