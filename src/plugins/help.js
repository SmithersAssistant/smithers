import React from 'react'
import orderBy from 'lodash/orderBy'
const HELP_COMPONENT = 'com.robinmalfait.help'

export default robot => {
  const {StyleSheet, css, px, color} = robot.UI
  const {Blank} = robot.cards
  const {List, Subheader, ListItem} = robot.UI.material

  const styles = StyleSheet.create({
    wrapper: {
      margin: 0,
      padding: 0,
      columnCount: 3,
      columnGap: 16,
      '@media (max-width: 1200px)': {
        columnCount: 2
      },
      '@media (max-width: 800px)': {
        columnCount: 1
      }
    },
    plugin: {
      pageBreakInside: 'avoid',
      WebkitColumnBreakInside: 'avoid',
      breakInside: 'avoid',

      border: '1px solid #d9d9d9',
      overflow: 'hidden',
      width: '100%'
    },
    pluginTitle: {
      borderBottom: `1px solid ${color('grey', 200)}`
    },
    command: {
      cursor: 'default',
      ':hover': {
        backgroundColor: color('grey', 300)
      }
    },
    argument: {
      borderBottom: `2px solid ${color(robot.getPrimaryColor())}`,
      borderRadius: 3,
      padding: px(0, 4)
    },
    optional: {
      borderBottom: `2px solid ${color(robot.getPrimaryColor(), 100)}`,
      borderRadius: 3,
      padding: px(0, 4)
    },
    item: {
      marginRight: 4
    }
  })

  const Help = React.createClass({
    countPlugins () {
      const installedPlugins = this.props.plugin !== undefined
        ? robot.plugins().filter(plugin => this.props.plugin === plugin.name)
        : robot.plugins()

      return installedPlugins.length
    },
    parseUsage ({usage, arguments: args, optionals}) {
      let result = usage.split(' ')

      if (args.length > 0) {
        args.forEach(arg => {
          result = result.map(item => {
            if (item === arg.match) {
              return <span className={css(styles.argument)}>{arg.humanized}</span>
            }

            return item
          })
        })
      }

      if (optionals.length > 0) {
        optionals.forEach(arg => {
          result = result.map(item => {
            if (item === arg.match) {
              return <span className={css(styles.optional)}>{arg.humanized}</span>
            }

            return item
          })
        })
      }

      return (
        <span>
          {result.map((item, i) => <span key={i} className={css(styles.item)}>{item}</span>)}
        </span>
      )
    },
    renderPlugins () {
      const plugins = []
      const installedPlugins = this.props.plugin !== undefined
        ? robot.plugins().filter(plugin => this.props.plugin === plugin.name)
        : robot.plugins()

      orderBy(installedPlugins, ['name']).forEach(plugin => {
        const commands = []
        orderBy(plugin.commands, ['usage']).forEach(command => {
          commands.push({
            title: this.parseUsage(command),
            description: String(command.description)
          })
        })

        plugins.push((
          <li>
            <List className={css(styles.plugin)}>
              <Subheader className={css(styles.pluginTitle)}>
                {String(plugin.name)}
              </Subheader>

              {commands.map((command, i) => (
                <ListItem
                  className={css(styles.command)}
                  disabled
                  key={i}
                  primaryText={command.title}
                  secondaryText={command.description}
                />
              ))}
            </List>
            <br />
          </li>
        ))
      })

      return plugins
    },
    render () {
      const {...other} = this.props
      const pluginCount = this.countPlugins()
      const props = robot.deleteProps(other, [
        'plugin'
      ])

      return (
        <Blank
          {...props}
          title={(
            <span>Help &middot; {`${pluginCount} plugin${pluginCount === 1 ? '' : 's'} installed`}</span>
          )}
        >
          <ul className={css(styles.wrapper)}>
            {this.renderPlugins()}
          </ul>
        </Blank>
      )
    }
  })

  robot.registerComponent(Help, HELP_COMPONENT)

  robot.listen(/^help$/, {
    description: 'Help Plugin',
    usage: 'help'
  }, () => {
    robot.addCard(HELP_COMPONENT)
  })

  robot.listen(/^help (.*)$/, {
    description: 'Get help for a specific plugin',
    usage: 'help <plugin>',
    args: {
      plugin: () => {
        return robot.plugins().map(plugin => plugin.name)
      }
    }
  }, (res) => {
    robot.addCard(HELP_COMPONENT, {
      plugin: res.matches[1]
    })
  })

  robot.on(robot.events.OPEN_HELP, () => {
    robot.addCard(HELP_COMPONENT)
  })
}
