import install from './spm/install'

// SPM: Smithers Package/Plugin Manager
export default robot => {
  install(robot)

  robot.listen(/^uninstall (.*)$/, {
    description: 'uninstall a plugin',
    usage: 'uninstall <plugin>'
  }, () => {

  })

  robot.listen(/^update (.*)$/, {
    description: 'update a plugin. these plugins will only be npm remote plugins.',
    usage: 'update <plugin>'
  }, () => {

  })
}
