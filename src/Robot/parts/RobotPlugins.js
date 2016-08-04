import pluginManager from 'pluginSystem/pluginManager'

// Return an array
const NOOP = () => ([])

let plugins = [];
let currentPlugin;

const humanize = (str) => {
  return str.split('_').join(' ')
};

const execAll = (regex, str) => {
  var match;
  var matches = [];
  var isGlobal = regex.global;

  while (match = regex.exec(str)) {
    matches.push({
      match: match[0],
      contents: match.slice(1).join(),
      humanized: humanize(match.slice(1).join()),
      index: match.index
    })

    if (!isGlobal) {
      break;
    }
  }

  return matches;
}

const parseUsage = (usageString, args) => {
  const ARGUMENTS_REGEX = /<([a-zA-Z0-9_]*)>/gi; // <name>
  const OPTIONALS_REGEX = /<([a-zA-Z0-9_]*)\?>/gi; // <name?>

  return {
    arguments: [].concat(execAll(ARGUMENTS_REGEX, usageString)).map((variable) => ({
      ...variable,
      data: args && args[variable.contents] || NOOP
    })),
    optionals: [].concat(execAll(OPTIONALS_REGEX, usageString)).map((variable) => ({
      ...variable,
      data: args && args[variable.contents] || NOOP
    }))
  }
};

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

  listen(regex, {description, usage, args}, cb) {
    plugins = plugins.map((plugin) => {
      if (plugin.name === currentPlugin.name) {
        plugin = {
          ...plugin,
          commands: [
            ...plugin.commands,
            {regex, description, usage, args, cb}
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
        matches:  plugin.regex.exec(command)
      }));
  },

  commands(plugin) {
    return plugins
      .find(p => p.name === plugin.name)
      .commands
      .map(({regex: name, description, usage, args}) => ({name, description, usage, ...parseUsage(usage, args)}));
  },

  plugins() {
    return pluginManager.list().map(plugin => ({
      ...plugin,
      commands: plugin.commands
    }))
  }
}
