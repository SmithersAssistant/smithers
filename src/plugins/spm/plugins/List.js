import uniq from 'lodash/uniq'
import styles from './styles'
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline'

export default robot => {
  const { React } = robot.dependencies
  const { enhance, withStyles } = robot
  const {
    Collection,
    CollectionItem,
    Button,
    material
  } = robot.UI
  const { Checkbox, IconButton } = material

  const List = React.createClass({
    getInitialState () {
      return {
        checked: []
      }
    },
    uninstallSelected () {
      robot.execute(`uninstall ${this.state.checked.join(' ')} --silent`)
    },
    handleCheck (e, isChecked, plugin) {
      if (isChecked) {
        this.setState({
          checked: uniq([
            ...this.state.checked,
            plugin
          ])
        })
      } else {
        this.setState({
          checked: this.state.checked.filter(p => p !== plugin)
        })
      }
    },
    render () {
      const { styles, plugins } = this.props
      const { checked } = this.state

      return (
        <Collection>
          {plugins.map((plugin, i) => (
            <CollectionItem
              className={styles.pluginItem}
              key={i}
            >
              <Checkbox
                checked={checked.includes(plugin.name)}
                onCheck={(e, isChecked) => this.handleCheck(e, isChecked, plugin.name)}
                label={plugin.name}
              />

              <span className={styles.info}>(v{plugin.version})</span>
              <IconButton
                onClick={() => robot.execute(`uninstall ${plugin.name}`)}
                className={styles.removePluginButton}
              >
                <RemoveIcon />
              </IconButton>
            </CollectionItem>
          ))}
          <CollectionItem>
            <Button onClick={() => this.uninstallSelected()} disabled={checked.length === 0}>UNINSTALL SELECTED</Button>
          </CollectionItem>
        </Collection>
      )
    }
  })

  return enhance(List, [
    withStyles(styles)
  ])
}
