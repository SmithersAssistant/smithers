import React from 'react';
import {css} from 'aphrodite';
import styles from './styles';
import {homedir} from 'os';
import fs from 'fs';
import {clipboard} from 'electron';
import pluginManager from 'pluginSystem/pluginManager';

import {
  LOCAL_PLUGIN
} from 'pluginSystem/sources';

import IconButton from 'material-ui/IconButton/IconButton';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import Dialog from 'material-ui/Dialog';

export default ({state, setState, robot}) => {
  const {
    Button,
    FlattButton,
    Collection,
    CollectionItem,
    TextField
  } = robot.UI;

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

  const localPlugins = robot.plugins().filter(plugin => plugin.source === LOCAL_PLUGIN);

  const AddButton = () => (
    <Button
      onClick={() => {
          const clipboardText = clipboard.readText();

          setState({
            addLocalPluginDialogOpen: true,
            addLocalPluginLocation: pluginManager.isValidPluginPath(clipboardText)
              ? clipboardText
              : ''
          })
        }}
    >
      Add Plugin
    </Button>
  );

  return (
    <div>
      <div className={css(styles.rightWrapper)}>
        <AddButton/>
      </div>

      {localPlugins.length > 0 ? (
        <Collection>
          {localPlugins.map((plugin, i) => (
            <CollectionItem className={css(styles.pluginItem)} key={i}>
              {plugin.name}

              <IconButton
                className={css(styles.removePluginButton)}
                onClick={() => {
                robot.removePlugin(plugin);
                resetAddLocalPlugin();
                robot.notify(`Plugin '${plugin.name}' has been uninstalled!`);
              }}
              ><RemoveIcon/></IconButton>

              <span className={css(styles.info)}>(v{plugin.version})</span>
            </CollectionItem>
          ))}
        </Collection>
      ) : (
        <p>
          There are no local plugins, add your first local plugin now!
        </p>
      )}

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
