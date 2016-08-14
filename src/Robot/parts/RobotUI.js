// UI
import * as theme from 'styles/theme'
import * as colors from 'styles/functions/_colors'

import A from 'components/UI/A'
import Button, {ButtonColors, FlatButton} from 'components/UI/Button'
import Icon from 'components/UI/Icon'
import {Tabs} from 'components/UI/Tabs'
import {Tab} from 'components/UI/Tab'
import Webview from 'components/UI/Webview'
import {Collection, CollectionItem} from 'components/UI/Collection'
import {StyleSheet, css} from 'aphrodite'

import * as material from 'material-ui'

export default {
  UI: {
    ...theme,
    theme: theme.theme,
    colors,

    material,

    A,
    Button,
    ButtonColors,
    FlatButton,
    Icon,
    Tabs,
    Tab,
    Webview,
    Collection,
    CollectionItem,
    StyleSheet,
    css
  }
}
