import React from 'react';
import {css} from 'aphrodite';
import styles from './styles';

import {
  DEFAULT_PLUGIN
} from 'pluginSystem/sources';

export default ({state, setState, robot}) => {
  const {
    Collection,
    CollectionItem,
  } = robot.UI;

  const defaultPlugins = robot.plugins().filter(plugin => plugin.source === DEFAULT_PLUGIN);

  return (
    <div>
      <Collection>
        {defaultPlugins.map((plugin, i) => (
          <CollectionItem
            key={i}
            className={css(styles.pluginItem)}
          >
            {plugin.name}

            <span className={css(styles.info)}>(v{plugin.version})</span>
          </CollectionItem>
        ))}
      </Collection>
    </div>
  )
}
