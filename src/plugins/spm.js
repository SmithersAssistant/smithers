// SPM: Smithers Package Manager
export default robot => {
  robot.listen(/^install (.*)$/, {
    description: 'install a package',
    usage: 'install <package_name>'
  }, () => {

  })

  robot.listen(/^uninstall (.*)$/, {
    description: 'uninstall a package',
    usage: 'uninstall <package_name>'
  }, () => {

  })

  robot.listen(/^update (.*)$/, {
    description: 'update a package',
    usage: 'update <package_name>'
  }, () => {

  })
}
