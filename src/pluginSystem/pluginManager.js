import Plugin from './Plugin'

class PluginManager {

  constructor() {
    this.cards = [];
    this.plugins = [];
  }

  register(info, cb) {
    if ("default" in cb) {
      cb = cb.default
    }

    this.plugins = [
      ...this.plugins,
      new Plugin(info, cb)
    ]
  }

  execute(command) {
    this.plugins.forEach(plugin => plugin.execute(command))
  }

  registerComponent(component, name) {
    this.cards = [
      ...this.cards,
      {
        component,
        name
      }
    ]
  }

  resolveComponent(name) {
    try {
      const card = this.cards.find(c => c.name == name)
      if (card) {
        return card.component;
      }

      return undefined;
    } catch (err) {
      console.error(`The plugin '${name}' could not be loaded.`)
      return undefined;
    }
  }

  list() {
    return this.plugins
  }
}

export default new PluginManager()
