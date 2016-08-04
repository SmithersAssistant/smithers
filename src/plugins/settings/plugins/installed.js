import React from 'react';
import {StyleSheet, css} from 'aphrodite';

import {
  DEFAULT_PLUGIN,
  LOCAL_PLUGIN,
  EXTERNAL_PLUGIN
} from 'pluginSystem/sources';

export default ({state, setState, robot}) => {
  const {
    color,

    Icon,
    Collection,
    CollectionItem
  } = robot.UI;

  const styles = StyleSheet.create({
    info: {
      fontSize: 12,
      float: 'right',
      color: color('grey'),
    },
    icon: {
      fontSize: 16,
      marginLeft: 4,
    },
    title: {
      borderBottom: '1px solid #ccc',
      fontWeight: 100,
    },
    subTitle: {
      float: 'right',
      color: '#ccc',
    }
  });

  const renderPlugin = (plugin, i) => {
    switch(plugin.source) {
      case DEFAULT_PLUGIN:
        return (
          <CollectionItem key={i}>
            {plugin.name}

            <span className={css(styles.info)}>
              ({plugin.version})
              <Icon
                className={css(styles.icon)}
                icon="home"
              />
            </span>
          </CollectionItem>
        )
      case LOCAL_PLUGIN:
        return (
          <CollectionItem key={i}>
            {plugin.name}

            <span className={css(styles.info)}>
              ({plugin.version})
              <Icon
                className={css(styles.icon)}
                icon="plug"
              />
            </span>
          </CollectionItem>
        )
      case EXTERNAL_PLUGIN:
        return (
          <CollectionItem key={i}>
            {plugin.name}

            <span className={css(styles.info)}>
              ({plugin.version})
              <Icon
                className={css(styles.icon)}
                icon="link"
              />
            </span>
          </CollectionItem>
        )
    }
  };

  const plugins = robot.plugins();

  const localPlugins = plugins.filter(plugin => plugin.source === LOCAL_PLUGIN);
  const externalPlugins = plugins.filter(plugin => plugin.source === EXTERNAL_PLUGIN);
  const defaultPlugins = plugins.filter(plugin => plugin.source === DEFAULT_PLUGIN);

  return (
    <div>
      <h3 className={css(styles.title)}>Local Plugins <small className={css(styles.subTitle)}>({localPlugins.length}/{plugins.length})</small></h3>
      <Collection>
        {localPlugins.map((plugin, i) => renderPlugin(plugin, i))}
      </Collection>

      <h3 className={css(styles.title)}>External Plugins <small className={css(styles.subTitle)}>({externalPlugins.length}/{plugins.length})</small></h3>
      <Collection>
        {externalPlugins.map((plugin, i) => renderPlugin(plugin, i))}
      </Collection>

      <h3 className={css(styles.title)}>Default Plugins <small className={css(styles.subTitle)}>({defaultPlugins.length}/{plugins.length})</small></h3>
      <Collection>
        {defaultPlugins.map((plugin, i) => renderPlugin(plugin, i))}
      </Collection>
    </div>
  )
}
