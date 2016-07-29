// Dependencies
import React from 'react';
import {css} from 'aphrodite';
import styles from './TabsStyles';
import {remote} from 'electron';
const {Menu} = remote;

// Pages
import Main from "components/Main"

// UI Elements
import {Tabs as TabsHolder} from 'components/UI/Tabs'
import {Tab} from 'components/UI/Tab'

const triggerMouseEvent = (node, eventType) => {
  const clickEvent = document.createEvent('MouseEvents');
  clickEvent.initEvent(eventType, true, true);
  node.dispatchEvent(clickEvent);
}

const hackMouseDown = (targetNode) => {
  triggerMouseEvent(targetNode, "mouseover");
  triggerMouseEvent(targetNode, "mousedown");
  triggerMouseEvent(targetNode, "mouseup");
  triggerMouseEvent(targetNode, "click");
}

const Tabs = ({tabsAreVisible, cards, onSortEnd, tabs, addTab, removeTab, removeTabsToTheLeft, removeTabsToTheRight, removeOtherTabs, activeTab, activateTab, focusInput, editTab, saveCardStates}) => {
  const onTabHolderContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.matches('ul')) {
      Menu.buildFromTemplate([{
        label: 'New Tab',
        click() {
          addTab()
        }
      }]).popup(remote.getCurrentWindow())
    }
  };

  const onTabContextMenu = (e, {id, title, canClose, canCloseOthers, canCloseToTheLeft, canCloseToTheRight}) => {
    e.preventDefault();
    e.stopPropagation();

    Menu.buildFromTemplate([{
      label: 'New Tab',
      click() {
        addTab()
      }
    }, {
      type: 'separator'
    }, {
      label: 'Edit Tab',
      click() {
        activateTab(id);
        editTab(title)
      }
    }, {
      type: 'separator'
    }, {
      label: 'Close Tab',
      enabled: canClose,
      click() {
        removeTab(id)
      }
    }, {
      label: 'Close Other Tabs',
      enabled: canCloseOthers,
      click() {
        removeOtherTabs(id)
      }
    }, {
      label: 'Close Tabs To The Left',
      enabled: canCloseToTheLeft,
      click() {
        removeTabsToTheLeft(id)
      }
    }, {
      label: 'Close Tabs To The Right',
      enabled: canCloseToTheRight,
      click() {
        removeTabsToTheRight(id)
      }
    }]).popup(remote.getCurrentWindow())
  };

  return !tabsAreVisible ? (
    <Main
      cards={cards}
      saveCardStates={saveCardStates}
    />
  ) : (
    <TabsHolder
      onContextMenu={onTabHolderContextMenu}
      onClick={focusInput}
      selectedIndex={activeTab}
      onSortStart={({ node }, event) => {
        if (event.button === 2) {
          hackMouseDown(node)
        }
      }}
      onSortEnd={onSortEnd}
    >
      {tabs.map(tab => (
        <Tab
          scrollIntoView={true}
          onContextMenu={(e) => onTabContextMenu(e, tab)}
          onDoubleClick={() => editTab(tab.title)}
          onActive={() => activateTab(tab.id)}
          key={tab.id}
          label={tab.title}
        >
          <div className={css(styles.outputStyles)}>
            <Main
              cards={tab.cards}
              saveCardStates={saveCardStates}
            />
          </div>
        </Tab>
      ))}
    </TabsHolder>
  )
};

export default Tabs
