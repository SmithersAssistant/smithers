import fs from 'fs';
import {remote} from 'electron';

const {app} = remote;
const CONFIG_PATH = app.getPath("userData") + "/user.config.json";

class Config {
  constructor() {
    this.loadConfig();
  }

  defaultConfig() {
    return {
      plugins: [],
    };
  }

  getConfigPath() {
    return CONFIG_PATH;
  }

  loadConfig(cb = () => {}) {
    fs.exists(CONFIG_PATH, (exists) => {
      if (exists) {
        fs.readFile(CONFIG_PATH, (err, res) => {
          try {
            cb(err ? this.defaultConfig() : JSON.parse(res));
          } catch(e) {
            console.error(`ERROR\n  Could not load config file (${CONFIG_PATH})\n  Check the file, and see what's going on, please`);
            Robot.notify(`Could not load config file`);
            cb(this.defaultConfig());
          }
        });
      } else {
        fs.writeFile(CONFIG_PATH, JSON.stringify(this.defaultConfig(), null, '  '));
        cb(this.defaultConfig());
      }
    });
  }
}

export default new Config();
