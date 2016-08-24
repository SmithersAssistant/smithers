import {resolve} from 'path'
import config from 'config'
import {writeFile} from 'fs'
import mkdirp from 'mkdirp'
const npmi = window.require('npmi')

import pluginManager from 'pluginSystem/pluginManager'

import {
  EXTERNAL_PLUGIN
} from 'pluginSystem/sources'

export default function npmInstall (input, robot) {
  return {
    label: 'NPM Install',
    cb ({ chain, appendToOutput, failed }) {
      return chain
        .then((module) => {
          appendToOutput(`Loaded NPM Version: ${npmi.NPM_VERSION}`)

          appendToOutput('\nExtracting module name and version from input')
          const [moduleName, moduleVersion = 'latest'] = module.split('@')
          appendToOutput(`\n\n - Module: ${moduleName}\n - Module Version: ${moduleVersion}\n\n`)

          appendToOutput('Creating destination Path: ')
          const basePath = config.getExternalPluginsPath()
          const path = resolve(basePath, moduleName)
          appendToOutput(path)

          return new Promise((resolve, reject) => {
            mkdirp(path, (err) => err ? reject(err) : resolve({
              moduleName, moduleVersion, path
            }))
          })
        })
        .then(({ moduleName, ...other }) => {
          const plugin = config.get('plugins.external', []).find(plugin => plugin === moduleName)

          if (plugin) {
            failed(`\nPlugin ${plugin} already exists`)
          }

          return {
            ...other,
            moduleName
          }
        })
        .then(({ moduleName, moduleVersion, path }) => {
          appendToOutput('\nBuilding options config')
          const options = {
            name: moduleName,
            version: moduleVersion,
            path,
            forceInstall: true,
            npmLoad: {
              loglevel: 'warn',
              progress: false
            }
          }

          appendToOutput(`\n\n${JSON.stringify(options, null, '  ')}\n\n`)

          appendToOutput('Creating custom package.json file: ')
          const packageJson = JSON.stringify({
            name: `plugin-${moduleName}`,
            dependencies: {},
            private: true
          }, null, '  ')
          appendToOutput(`\n\n${packageJson}\n\n`)
          appendToOutput('Writing package.json file to: ')
          const packageJsonPath = resolve(path, 'package.json')
          appendToOutput(`${packageJsonPath}\n\n`)

          return new Promise((resolve, reject) => {
            writeFile(packageJsonPath, packageJson, (err) => err ? reject(err) : resolve({
              options, path
            }))
          })
        })
        .then(({ options, path }) => {
          appendToOutput('Actually installing plugin')
          return new Promise((resolve, reject) => {
            npmi(options, (err, result) => {
              err
                ? reject(err)
                : resolve({ result, path })
            })
          })
        })
        .then(({ result = [], path }) => {
          result.map(dependency => appendToOutput(`\n - ${dependency[ 0 ]}`))
          return {
            path,
            module: result[ result.length - 1 ][ 0 ]
          }
        })
        .then(({ path, module }) => {
          const [moduleName, moduleVersion] = module.split('@')
          appendToOutput('\n\nUpdating package.json file')
          const packageJsonPath = resolve(path, 'package.json')
          const pckg = window.require(packageJsonPath)

          pckg.dependencies = {
            ...pckg.dependencies,
            [moduleName]: moduleVersion
          }
          pckg.version = moduleVersion

          const plugin = {
            name: moduleName,
            source: EXTERNAL_PLUGIN
          }

          return new Promise((resolve, reject) => {
            writeFile(packageJsonPath, JSON.stringify(pckg, null, '  '), err => {
              if (err) {
                reject(err)
              }
              resolve({
                path,
                plugin
              })
            })
          })
        })
        .then(({ path, plugin }) => {
          appendToOutput('\nRegistering it in the config file')
          config.set('plugins.external', [
            ...config.get('plugins.external'),
            plugin.name
          ])

          return {
            path,
            plugin
          }
        })
        .then(({ path, plugin }) => {
          appendToOutput('\nWriting magic file: ')
          const magicFile = resolve(path, 'index.js')
          appendToOutput(magicFile)

          return new Promise((resolve, reject) => {
            writeFile(magicFile, [
              `var obj = require('${plugin.name}');`,
              'module.exports = obj && obj.__esModule ? obj : { default: obj };'
            ].join('\n\n'), (err) => err ? reject(err) : resolve(plugin))
          })
        })
        .then((plugin) => {
          appendToOutput('\nRegistering plugin in the plugin manager')
          const location = resolve(config.getExternalPluginsPath(), plugin.name)

          pluginManager.register({
            ...plugin,
            version: window.require(resolve(location, 'package.json')).version,
            location,
            source: EXTERNAL_PLUGIN
          }, pluginManager.loadPlugin(location))

          return plugin
        })
    }
  }
}
