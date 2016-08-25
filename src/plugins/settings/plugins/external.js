import React from 'react'
import {css} from 'aphrodite'
import styles from './styles'

import IconButton from 'material-ui/IconButton/IconButton'
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline'

import {
  EXTERNAL_PLUGIN
} from 'pluginSystem/sources'

export default ({robot}) => {
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
              className={css(styles.pluginItem)}
            >
              {plugin.name}

              <IconButton
                className={css(styles.removePluginButton)}
                onClick={() => {
                  robot.removeExternalPlugin(plugin)
                }}
              ><RemoveIcon /></IconButton>

              <span className={css(styles.info)}>(v{plugin.version})</span>
            </CollectionItem>
          ))}
        </Collection>
      ) : (
        <p>There are no external plugins yet, you can find some plugins of our plugins <A target='_blank' href='https://www.npmjs.com/search?q=smithers+assistant'>on npm</A></p>
      )}
    </div>
  )
}
