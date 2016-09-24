import React from 'react'
import listFactory from './List'

import {
  EXTERNAL_PLUGIN
} from 'pluginSystem/sources'

export default ({ robot }) => {
  const { A } = robot.UI
  const externalPlugins = robot.plugins().filter(plugin => plugin.source === EXTERNAL_PLUGIN)
  const List = listFactory(robot)

  function renderList () {
    return (
      <List
        plugins={externalPlugins}
      />
    )
  }

  return (
    <div>
      {externalPlugins.length > 0
        ? renderList()
        : (
        <p>
          There are no external plugins yet, you can find some plugins of our plugins <A
            target='_blank'
            href='https://www.npmjs.com/search?q=smithers+assistant'
          >
            on npm
          </A>
        </p>
      )}
    </div>
  )
}
