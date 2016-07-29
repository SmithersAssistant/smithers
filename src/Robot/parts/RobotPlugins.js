import {List, Map} from 'Immutable'
// import pluginManager from '../PluginManager'

let observables = List([]);
let currentPlugin;

export default {
  registerPlugin(plugin) {
    observables = observables.push(
      Map({
        name: plugin.name,
        commands: List([])
      })
    );

    currentPlugin = plugin
  },
  listen(regex, description, cb) {
    let p = observables.filter(o => o.get('name') == currentPlugin.name).first();

    p = p.set('commands', p.get('commands').push({
      regex, description, cb
    }));

    observables = observables.map(o => o.get('name') == currentPlugin.name ? p : o)
  },
  test(plugin, command) {
    observables
    .filter(o => o.get('name') == plugin.name)
    .first()
    .get('commands')
    .filter(o => o.regex.test(command))
    .forEach(o => o.cb({
      command,
      matches: o.regex.exec(command)
    }))
  },
  commands(plugin) {
    return observables
    .filter(o => o.get('name') == plugin.name)
    .first()
    .get('commands')
    .map(o => {
      return {
        name: o.regex,
        description: o.description
      }
    })
  },
  plugins() {
    return pluginManager.list().map(plugin => ({
      ...plugin,
      commands: plugin.commands.toArray()
    })).toArray()
  }
}
