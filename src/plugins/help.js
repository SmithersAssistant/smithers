import React from 'react'

const HELP_COMPONENT = 'com.robinmalfait.help';

export default robot => {

  const {
    color
  } = robot.UI;
  const {Table} = robot.cards;

  const Help = React.createClass({
    countPlugins() {
      return robot.plugins().length
    },
    parseUsage({usage, arguments: args, optionals}) {
      let result = usage.split(' ');

      if (args.length > 0) {
        args.forEach(arg => {
          result = result.map(item => {
            if (item === arg.match) {
              return <span style={{
                borderBottom: `2px solid ${color(Robot.getThemeColor())}`,
                borderRadius: 4
              }}>{arg.humanized}</span>
            }

            return item;
          });
        });
      }

      if (optionals.length > 0) {
        optionals.forEach(arg => {
          result = result.map(item => {
            if (item === arg.match) {
              return <span style={{
                borderBottom: `2px solid ${color(Robot.getThemeColor(), 100)}`,
                borderRadius: 4
              }}>{arg.humanized}</span>
            }

            return item;
          });
        });
      }

      return (
        <span>
          {result.map((item, i) => <span key={i} style={{
            marginRight: 4
          }}>{item}</span>)}
        </span>
      )
    },
    renderPlugins() {
      const plugins = [];
      robot.plugins().forEach(plugin => {
        let showed = false;

        plugin.commands.forEach(command => {
          plugins.push([
            showed ? '' : String(plugin.name),
            this.parseUsage(command),
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
          header={['Plugin Name', 'Usage', 'Description']}
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

  robot.listen(/^help$/, {
    description: "Help Plugin",
    usage: 'help'
  }, () => {
    robot.addCard(HELP_COMPONENT);
  });

  robot.on(robot.events.OPEN_HELP, () => {
    robot.addCard(HELP_COMPONENT);
  });
}
