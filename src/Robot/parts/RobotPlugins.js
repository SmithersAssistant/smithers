import pluginManager from 'PluginSystem/PluginManager'

let plugins = [];
let currentPlugin;

export default {
  registerPlugin(plugin) {
    plugins = [
      ...plugins,
      {
        name: plugin.name,
        commands: []
      }
    ]
    currentPlugin = plugin
  },
  listen(regex, {description, usage}, cb) {
    plugins = plugins.map((plugin) => {
      if (plugin.name === currentPlugin.name) {
        plugin = {
          ...plugin,
          commands: [
            ...plugin.commands,
            {regex, description, usage, cb}
          ]
        };
      }

      return plugin;
    });
  },
  test(plugin, command) {
    plugins
      .find(p => p.name === plugin.name)
      .commands
      .filter(cmd => cmd.regex.test(command))
      .forEach(plugin => plugin.cb({
        command,
        matches: plugin.regex.exec(command)
      }));
  },
  commands(plugin) {
    return plugins
      .find(p => p.name === plugin.name)
      .commands
      .map(({regex: name, description, usage}) => ({name, description, usage}));
  },
  plugins() {
    return pluginManager.list().map(plugin => ({
      ...plugin,
      commands: plugin.commands
    }))
  }
}
