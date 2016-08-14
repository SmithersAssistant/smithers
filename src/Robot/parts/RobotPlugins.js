import pluginManager from 'pluginSystem/pluginManager'

// Return an array
const NOOP = () => ([])

let plugins = []
let currentPlugin

const humanize = (str) => {
  return str.split('_').join(' ')
}

const execAll = (regex, str) => {
  var match
  var matches = []
  var isGlobal = regex.global

  while (match = regex.exec(str)) {
    matches.push({
      match: match[0],
      contents: match.slice(1).join(),
      humanized: humanize(match.slice(1).join()),
      index: match.index
    })

    if (!isGlobal) {
      break
    }
  }

  return matches
}

const parseUsage = (usageString, args) => {
  const ARGUMENTS_REGEX = /<([a-zA-Z0-9_]*)>/gi // <name>
  const OPTIONALS_REGEX = /<([a-zA-Z0-9_]*)\?>/gi // <name?>

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
}

export default {
  removePlugin (pluginToBeUninstalled) {
    pluginManager.removeLocalPlugin(pluginToBeUninstalled)

    plugins = plugins.filter(plugin => {
      if (this._isCurrentPlugin(plugin, pluginToBeUninstalled)) {
        return null
      }

      return plugin
    }).filter(x => !!x)
  },

  removeExternalPlugin (pluginToBeUninstalled) {
    pluginManager.removeExternalPlugin(pluginToBeUninstalled)

    plugins = plugins.filter(plugin => {
      if (this._isCurrentPlugin(plugin, pluginToBeUninstalled)) {
      }

      if (this._isCurrentPlugin(plugin, pluginToBeUninstalled)) {
        return null
      }

      return plugin
    }).filter(x => !!x)
  },

  registerPlugin (plugin) {
    plugins = [
      ...plugins,
      {
        ...plugin,
        commands: []
      }
    ]
    currentPlugin = plugin
  },

  listen (regex, {description, usage, args}, cb) {
    plugins = plugins.map((plugin) => {
      if (this._isCurrentPlugin(plugin, currentPlugin)) {
        plugin = {
          ...plugin,
          commands: [
            ...plugin.commands,
            {regex, description, usage, args, cb}
          ]
        }
      }

      return plugin
    })
  },

  test (plugin, command) {
    plugins
      .find(p => this._isCurrentPlugin(p, plugin))
      .commands
      .filter(cmd => cmd.regex.test(command))
      .forEach(plugin => plugin.cb({
        command,
        matches:  plugin.regex.exec(command)
      }))
  },

  commands (plugin) {
    return plugins
      .find(p => this._isCurrentPlugin(p, plugin))
      .commands
      .map(({regex: name, description, usage, args}) => ({name, description, usage, ...parseUsage(usage, args)}))
  },

  plugins () {
    return pluginManager.list()
  },

  execute (value) {
    pluginManager.execute(value)
  },

  _isCurrentPlugin (a, b) {
    // Modules with the same name are not allowed in npm
    // But when you have a module with the same name locally
    // We check  the source of it

    // If we have local modules with the same name, the source will be the same
    // Therefor we check the location
    return (a.name === b.name) && (a.source === b.source) && (a.location === b.location)
  }
}
