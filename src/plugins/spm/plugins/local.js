import React from 'react'
import {sep} from 'path'
import {homedir} from 'os'
import styles from './styles'
import {withStyles} from 'components/functions'

import {
  LOCAL_PLUGIN
} from 'pluginSystem/sources'

export default withStyles(styles)(({styles, robot}) => {
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
            <CollectionItem className={styles.pluginItem} key={i}>
              {plugin.name}
              <span className={styles.info}>(v{plugin.version})</span>
            </CollectionItem>
          ))}
        </Collection>
      ) : (
        <div>
          <p>
            There are no local plugins, add your first local plugin now!
          </p>
          <pre>install {`${homedir()}${sep}your_first_plugin`}</pre>
        </div>
      )}
    </div>
  )
})
