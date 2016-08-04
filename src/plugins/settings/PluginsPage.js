import React from 'react';

import InstalledPage from './plugins/installed'
import SearchPage from './plugins/search'

export default (robot) => ({state, setState, tabsProps, tabProps}) => {

  const {
    Tab,
    Tabs
  } = Robot.UI;

  const pages = [{
    label: 'Installed',
    body: (
      <InstalledPage
        robot={robot}
        setState={setState}
        state={state}
      />
    )
  }, {
    label: 'Search',
    body: (
      <SearchPage
        robot={robot}
        setState={setState}
        state={state}
      />
    )
  }];

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
