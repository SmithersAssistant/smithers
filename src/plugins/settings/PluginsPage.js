import React from 'react'

import LocalPage from './plugins/local'
import ExternalPage from './plugins/external'
import DefaultPage from './plugins/default'

export default (robot) => ({state, setState, tabsProps, tabProps, updatedAt}) => {

  const {
    Tab,
    Tabs
  } = Robot.UI

  const pages = [{
    label: 'Local plugins',
    body: (
      <LocalPage
        robot={robot}
        setState={setState}
        state={state}
      />
    )
  }, {
    label: 'External plugins',
    body: (
      <ExternalPage
        updatedAt={updatedAt}
        robot={robot}
        setState={setState}
        state={state}
      />
    )
  }, {
    label: 'Default plugins',
    body: (
      <DefaultPage
        robot={robot}
        setState={setState}
        state={state}
      />
    )
  }]

  return (
    <Tabs
      {...tabsProps}
    >
      {pages.map((page, i) => (
        <Tab
          {...tabProps}
          key={i}
          onActive={() => setState({
            activeTab: i
          })}
          label={page.label}
        ><div style={{padding: 20}}>{page.body}</div></Tab>
      ))}
    </Tabs>
  )
}
