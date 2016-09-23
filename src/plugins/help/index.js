import React from 'react'
import orderBy from 'lodash/orderBy'
import styleFactory from './styles'
import updateAvailableFactory from './update'

const HELP_COMPONENT = 'com.robinmalfait.help'

export default robot => {
  const {withStyles} = robot.UI
  const {Blank} = robot.cards
  const {List, Subheader, ListItem} = robot.UI.material

  updateAvailableFactory(robot)

  const styles = styleFactory(robot)
  const ws = withStyles(styles)

  const Kind = ws(({ styles, source, ...other }) => {
    return (
      <span className={styles.badge} {...other}>{source.replace('_PLUGIN', '').toLowerCase()}</span>
    )
  })

  const Help = React.createClass({
    countPlugins () {
      const installedPlugins = this.props.plugin !== undefined
        ? robot.plugins().filter(plugin => this.props.plugin === plugin.name)
        : robot.plugins()

      return installedPlugins.length
    },
    parseUsage ({usage, arguments: args, optionals}) {
      const {styles} = this.props
      let result = usage.split(' ')

      if (args.length > 0) {
        args.forEach(arg => {
          result = result.map(item => {
            if (item === arg.match) {
              return <span className={styles.argument}>{arg.humanized}</span>
            }

            return item
          })
        })
      }

      if (optionals.length > 0) {
        optionals.forEach(arg => {
          result = result.map(item => {
            if (item === arg.match) {
              return <span className={styles.optional}>{arg.humanized}</span>
            }

            return item
          })
        })
      }

      return (
        <span>
          {result.map((item, i) => <span key={i} className={styles.item}>{item}</span>)}
        </span>
      )
    },
    renderPlugins () {
      const {styles} = this.props
      const plugins = []
      const installedPlugins = this.props.plugin !== undefined
        ? robot.plugins().filter(plugin => this.props.plugin === plugin.name)
        : robot.plugins()

      orderBy(installedPlugins, ['name']).forEach((plugin, i) => {
        const commands = []
        orderBy(plugin.commands, ['usage']).forEach(command => {
          commands.push({
            title: this.parseUsage(command),
            description: String(command.description)
          })
        })

        plugins.push((
          <li key={i}>
            <List className={styles.plugin}>
              <Subheader className={styles.pluginTitle}>
                {String(plugin.name)}
                <span className={styles.versionNumber}>v{plugin.version}</span>
                <Kind source={plugin.source} />
              </Subheader>

              {commands.map((command, i) => (
                <ListItem
                  className={styles.command}
                  disabled
                  key={i}
                  primaryText={command.title}
                  secondaryText={command.description}
                  title={command.description}
                />
              ))}
              <div className={styles.clean} />
            </List>
          </li>
        ))
      })

      return plugins
    },
    render () {
      const {styles, ...other} = this.props
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
          <ul className={styles.wrapper}>
            {this.renderPlugins()}
          </ul>
        </Blank>
      )
    }
  })

  robot.registerComponent(ws(Help), HELP_COMPONENT)

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
