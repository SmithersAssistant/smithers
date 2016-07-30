import React from 'react'

const HELP_COMPONENT = 'com.robinmalfait.help';

export default robot => {

  const {Table} = robot.cards;

  const Help = React.createClass({
    countPlugins() {
      return robot.plugins().length
    },
    renderPlugins() {
      const plugins = [];
      robot.plugins().forEach(plugin => {
        let showed = false;

        plugin.commands.forEach(command => {
          plugins.push([
            showed ? '' : String(plugin.name),
            String(command.name),
            String(command.description)
          ])

          showed = true
        })
      })

      return plugins
    },
    render() {
      const {...other} = this.props

      return (
        <Table
          {...other}
          title="Help"
          header={['Plugin Name', 'Action RegEx', 'Description']}
          body={this.renderPlugins()}
          footer={[{
            colSpan: 3,
            value: `${this.countPlugins()} plugins installed.`
          }]}
        />
      )
    }
  })

  robot.registerComponent(Help, HELP_COMPONENT);

  robot.listen(/^help$/, "Help Plugin", () => {
    robot.addCard(HELP_COMPONENT);
  });

  robot.on(robot.events.OPEN_HELP, () => {
    robot.addCard(HELP_COMPONENT);
  });
}
