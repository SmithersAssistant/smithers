import robot from 'Robot'

const mandatory = () => {
  throw new Error("Argument is mandatory!")
}

class Plugin {
  constructor(name, cb = mandatory()) {
    this.name = name
    robot.registerPlugin(this)
    cb(robot)
    this.commands = robot.commands(this)
  }

  execute(command) {
    robot.test(this, command)
  }
}

export default Plugin
