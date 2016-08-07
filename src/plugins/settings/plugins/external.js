import React from 'react';
import {css} from 'aphrodite';
import styles from './styles';
import Dialog from 'material-ui/Dialog';
import pluginManager from 'pluginSystem/pluginManager';

import {
  EXTERNAL_PLUGIN
} from 'pluginSystem/sources';

export default ({state, setState, robot}) => {
  const {
    Button,
    TextField,
    FlatButton,
    Collection,
    CollectionItem,
  } = robot.UI;

  const resetAddExternalPlugin = () => {
    setState({
      addExternalPluginDialogOpen: false,
      addExternalPluginPackage: '',
    });
  };

  const handlePluginPackage = (e) => {
    setState({
      addExternalPluginPackage: e.target.value
    });
  };

  const AddButton = () => (
    <Button
      onClick={() => {
        setState({
          addExternalPluginDialogOpen: true
        });
      }}
    >
      Add Plugin
    </Button>
  );

  const externalPlugins = robot.plugins().filter(plugin => plugin.source === EXTERNAL_PLUGIN);

  return (
    <div>
      <div className={css(styles.rightWrapper)}>
        <AddButton/>
      </div>

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

      {/* DIALOGS */}
      <Dialog
        title="Add an External Plugin"
        actions={[
          <FlatButton onClick={resetAddExternalPlugin}>CANCEL</FlatButton>,
          <FlatButton
            disabled={state.addExternalPluginPackage === ''}
            onClick={() => {
              console.log(`Loading plugin (${state.addExternalPluginPackage})`);
              pluginManager.addExternalPlugin(state.addExternalPluginPackage);
              resetAddExternalPlugin();
            }}
          >
            ADD
          </FlatButton>
        ]}
        modal={false}
        open={state.addExternalPluginDialogOpen}
        onRequestClose={resetAddExternalPlugin}
      >
        <TextField
          autoFocus={true}
          type="text"
          value={state.addExternalPluginPackage}
          floatingLabelText="Package Name"
          fullWidth={true}
          hintText="packagename or packagename@version"
          onChange={handlePluginPackage}
        ></TextField>
      </Dialog>
    </div>
  )
}
