import robot from 'Robot'

const mandatory = () => {
  throw new Error("Argument is mandatory!")
}

class Plugin {
  constructor({name, version, source}, cb = mandatory()) {
    this.name = name
    this.version = version;
    this.source = source;
    
    robot.registerPlugin(this)
    cb(robot)
    this.commands = robot.commands(this)
  }

  execute(command) {
    robot.test(this, command)
  }
}

export default Plugin
