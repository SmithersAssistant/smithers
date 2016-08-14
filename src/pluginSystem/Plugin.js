import robot from 'Robot'

const mandatory = () => {
  throw new Error('Argument is mandatory!')
}

class Plugin {
  constructor ({name, version, source, location}, cb = mandatory()) {
    this.name = name
    this.version = version
    this.source = source
    this.location = location

    robot.registerPlugin(this)
    cb(robot)
    this.commands = robot.commands(this)
  }

  execute (command) {
    robot.test(this, command)
  }
}

export default Plugin
