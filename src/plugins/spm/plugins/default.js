import React from 'react'
import styles from './styles'
import {withStyles} from 'components/functions'

import {
  DEFAULT_PLUGIN
} from 'pluginSystem/sources'

export default withStyles(styles)(({styles, robot}) => {
  const {
    Collection,
    CollectionItem
  } = robot.UI

  const defaultPlugins = robot.plugins().filter(plugin => plugin.source === DEFAULT_PLUGIN)

  return (
    <div>
      <Collection>
        {defaultPlugins.map((plugin, i) => (
          <CollectionItem
            key={i}
            className={styles.pluginItem}
          >
            {plugin.name}

            <span className={styles.info}>(v{plugin.version})</span>
          </CollectionItem>
        ))}
      </Collection>
    </div>
  )
})
