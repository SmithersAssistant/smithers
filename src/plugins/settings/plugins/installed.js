import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {homedir} from 'os';
import fs from 'fs';
import {clipboard} from 'electron';
import pluginManager from 'pluginSystem/pluginManager';

import {
  DEFAULT_PLUGIN,
  LOCAL_PLUGIN,
  EXTERNAL_PLUGIN
} from 'pluginSystem/sources';

import IconButton from 'material-ui/IconButton/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import Dialog from 'material-ui/Dialog';

export default ({state, setState, robot}) => {
  const {
    color,
    theme,

    FlattButton,
    Collection,
    CollectionItem,
    TextField
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
      height: 48,
      lineHeight: theme.px(48),
    },
    subTitle: {
      float: 'right',
      color: '#ccc',
    },
    addPluginButton: {
      float: 'right',
    }
  });

  const renderPlugin = (plugin, i) => (
    <CollectionItem key={i}>
      {plugin.name}

      <span className={css(styles.info)}>(v{plugin.version})</span>
    </CollectionItem>
  );

  const resetAddLocalPlugin = () => {
    setState({
      addLocalPluginDialogOpen: false,
      addLocalPluginLocation: '',
      addLocalPluginErrorText: '',
    });
  };

  const handlePluginLocationPath = (event) => {
    const addLocalPluginLocation = event.target.value
    let addLocalPluginErrorText = '';

    if (!fs.existsSync(addLocalPluginLocation)) {
      addLocalPluginErrorText = 'Plugin path does not exist';
    } else if (!fs.statSync(addLocalPluginLocation).isDirectory()) {
      addLocalPluginErrorText = 'Plugin path is not a directory';
    } else if (!fs.existsSync(`${addLocalPluginLocation}/package.json`)) {
      addLocalPluginErrorText = 'Plugin path does not have a package.json file';
    }

    setState({addLocalPluginLocation, addLocalPluginErrorText});
  };

  const plugins = robot.plugins();

  const localPlugins = plugins.filter(plugin => plugin.source === LOCAL_PLUGIN);
  const externalPlugins = plugins.filter(plugin => plugin.source === EXTERNAL_PLUGIN);
  const defaultPlugins = plugins.filter(plugin => plugin.source === DEFAULT_PLUGIN);

  return (
    <div>
      <h3 className={css(styles.title)}>
        Local Plugins
        <small className={css(styles.subTitle)}>
          ({localPlugins.length}/{plugins.length})
        </small>
        <IconButton
          className={css(styles.addPluginButton)}
          onClick={() => {
            const clipboardText = clipboard.readText();

            setState({
              addLocalPluginDialogOpen: true,
              addLocalPluginLocation: pluginManager.isValidPluginPath(clipboardText)
                ? clipboardText
                : ''
            })
          }}
        ><AddIcon/></IconButton>
      </h3>
      <Collection>
        {localPlugins.map((plugin, i) => renderPlugin(plugin, i))}
      </Collection>

      <h3 className={css(styles.title)}>
        External Plugins
        <small className={css(styles.subTitle)}>({externalPlugins.length}/{plugins.length})</small>
      </h3>
      <Collection>
        {externalPlugins.map((plugin, i) => renderPlugin(plugin, i))}
      </Collection>

      <h3 className={css(styles.title)}>
        Default Plugins
        <small className={css(styles.subTitle)}>({defaultPlugins.length}/{plugins.length})</small>
      </h3>
      <Collection>
        {defaultPlugins.map((plugin, i) => renderPlugin(plugin, i))}
      </Collection>

      {/* DIALOGS */}
      <Dialog
        title="Add a Local Plugin"
        actions={[
          <FlattButton onClick={resetAddLocalPlugin}>CANCEL</FlattButton>,
          <FlattButton
            disabled={state.addLocalPluginLocation === '' || state.addLocalPluginErrorText !== ''}
            onClick={() => {
              console.log(`Loading plugin (${state.addLocalPluginLocation})`);
              let plugin = pluginManager.addLocalPlugin(state.addLocalPluginLocation);

              if (plugin) {
                resetAddLocalPlugin();
                robot.notify(`Plugin '${plugin.name}' has been installed!`);
              } else {
                console.log(`Plugin already installed`);
                setState({addLocalPluginErrorText: 'Plugin already installed'});
              }
            }}
          >
            ADD
          </FlattButton>
        ]}
        modal={false}
        open={state.addLocalPluginDialogOpen}
        onRequestClose={resetAddLocalPlugin}
      >
        <TextField
          autoFocus={true}
          type="text"
          value={state.addLocalPluginLocation}
          floatingLabelText="Path To Plugin"
          fullWidth={true}
          hintText={homedir()}
          errorText={state.addLocalPluginErrorText}
          onChange={handlePluginLocationPath}
        ></TextField>
      </Dialog>
    </div>
  )
}
