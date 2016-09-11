import React from 'react'
import styles from './styles'
import {withStyles} from 'components/functions'

import {
  EXTERNAL_PLUGIN
} from 'pluginSystem/sources'

export default withStyles(styles)(({styles, robot}) => {
  const {
    A,
    Collection,
    CollectionItem
  } = robot.UI

  const externalPlugins = robot.plugins().filter(plugin => plugin.source === EXTERNAL_PLUGIN)

  return (
    <div>
      {externalPlugins.length > 0 ? (
        <Collection>
          {externalPlugins.map((plugin, i) => (
            <CollectionItem
              key={i}
              className={styles.pluginItem}
            >
              {plugin.name}
              <span className={styles.info}>(v{plugin.version})</span>
            </CollectionItem>
          ))}
        </Collection>
      ) : (
        <p>There are no external plugins yet, you can find some plugins of our plugins <A target='_blank' href='https://www.npmjs.com/search?q=smithers+assistant'>on npm</A></p>
      )}
    </div>
  )
})
