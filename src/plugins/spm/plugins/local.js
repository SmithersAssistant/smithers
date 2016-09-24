import React from 'react'
import { sep } from 'path'
import { homedir } from 'os'
import listFactory from './List'

import {
  LOCAL_PLUGIN
} from 'pluginSystem/sources'

export default ({ robot }) => {
  const localPlugins = robot.plugins().filter(plugin => plugin.source === LOCAL_PLUGIN)
  const List = listFactory(robot)

  function renderList () {
    return (
      <List
        plugins={localPlugins}
      />
    )
  }

  return (
    <div>
      {localPlugins.length > 0
        ? renderList()
        : (
        <div>
          <p>
            There are no local plugins, add your first local plugin now!
          </p>
          <pre>install {`${homedir()}${sep}your_first_plugin`}</pre>
        </div>
      )}
    </div>
  )
}
