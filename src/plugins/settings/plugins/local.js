import React from 'react'
import {css} from 'aphrodite'
import styles from './styles'

import {
  LOCAL_PLUGIN
} from 'pluginSystem/sources'

import IconButton from 'material-ui/IconButton/IconButton'
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline'

export default ({robot}) => {
  const {
    Collection,
    CollectionItem
  } = robot.UI

  const localPlugins = robot.plugins().filter(plugin => plugin.source === LOCAL_PLUGIN)

  return (
    <div>
      {localPlugins.length > 0 ? (
        <Collection>
          {localPlugins.map((plugin, i) => (
            <CollectionItem className={css(styles.pluginItem)} key={i}>
              {plugin.name}

              <IconButton
                className={css(styles.removePluginButton)}
                onClick={() => {
                  robot.removePlugin(plugin)
                  robot.notify(`Plugin '${plugin.name}' has been uninstalled!`)
                }}
              ><RemoveIcon /></IconButton>

              <span className={css(styles.info)}>(v{plugin.version})</span>
            </CollectionItem>
          ))}
        </Collection>
      ) : (
        <p>
          There are no local plugins, add your first local plugin now!
        </p>
      )}
    </div>
  )
}
