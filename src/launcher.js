import { ipcRenderer } from 'electron'

import Navbar from './components/layout/NavbarContainer'
import run from './_run'

run(Navbar, {
  launcher: true,
  onHandleInput: (data) => {
    ipcRenderer.send('handleinput', data)
  }
})
