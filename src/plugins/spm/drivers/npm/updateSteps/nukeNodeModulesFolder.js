import {resolve} from 'path'
import rimraf from 'rimraf'

export default function nukeNodeModulesFolder (input, robot) {
  return {
    label: 'Nuke node_modules folder',
    cb ({ chain, appendToOutput }) {
      return chain
        .then((plugin) => {
          appendToOutput('Locating path: ')
          console.log(plugin)
          const nodeModulesPath = resolve(plugin.location, 'node_modules')
          appendToOutput(nodeModulesPath)

          appendToOutput(`\n - Removing ${nodeModulesPath}`)
          return new Promise((resolve, reject) => {
            rimraf(nodeModulesPath, (err) => err
              ? reject(err)
              : resolve(plugin))
          })
        })
    }
  }
}
