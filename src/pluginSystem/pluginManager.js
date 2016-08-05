import fs from 'fs';
import {resolve} from 'path';
import config from 'config';
import {LOCAL_PLUGIN} from './sources';
import Plugin from './Plugin';

class PluginManager {

  constructor() {
    this.cards = [];
    this.plugins = [];
  }

  addLocalPlugin(location) {
    const meta = window.require(resolve(location, 'package.json'));
    const plugins = config.get('plugins.local');
    const alreadyExists = plugins.filter(plugin => plugin.location === location).length > 0;

    if (alreadyExists || !this.isValidPluginPath(location)) {
      return false;
    }

    const plugin = {
      name: meta.name,
      location,
      version: meta.version
    };

    plugins.push(plugin);
    config.set('plugins.local', plugins);

    this.register({
      ...plugin,
      source: LOCAL_PLUGIN,
    }, this.loadPlugin(location));

    return plugin;
  }

  loadPlugin(path) {
    try {
      return window.require(resolve(path));
    } catch (err) {
      return null;
    }
  }

  isValidPluginPath(path) {
    if (!fs.existsSync(path)) {
      return false;
    } else if (!fs.statSync(path).isDirectory()) {
      return false;
    } else if (!fs.existsSync(`${path}/package.json`)) {
      return false;
    }

    return true;
  }

  register(info, cb) {
    if (!cb) {
      console.error([
        'COULD NOT LOAD PLUGIN',
        `name: ${info.name}`,
        `version: ${info.version}`,
      ].join('\n  '));
      return;
    }

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

export default new PluginManager();
