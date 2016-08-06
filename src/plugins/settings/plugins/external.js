import React from 'react';
import {css} from 'aphrodite';
import styles from './styles';

import {
  EXTERNAL_PLUGIN
} from 'pluginSystem/sources';

export default ({state, setState, robot}) => {
  const {
    Collection,
    CollectionItem,
  } = robot.UI;

  const externalPlugins = robot.plugins().filter(plugin => plugin.source === EXTERNAL_PLUGIN);

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

              <span className={css(styles.info)}>(v{plugin.version})</span>
            </CollectionItem>
          ))}
        </Collection>
      ) : (
        <p>There are no external plugins yet</p>
      )}
    </div>
  )
}
