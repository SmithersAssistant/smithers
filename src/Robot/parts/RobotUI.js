// UI
import * as theme from 'styles/theme'
import {color} from 'styles/functions/_color'
import * as colors from 'styles/functions/_colors'

import A from 'components/UI/A'
import Button, {ButtonColors, FlattButton} from 'components/UI/Button'
import Icon from 'components/UI/Icon'
import {Tabs} from 'components/UI/Tabs'
import {Tab} from 'components/UI/Tab'
import Chip from 'components/UI/Chip'
import Webview from 'components/UI/Webview'
import TextField from 'components/UI/TextField'
import SelectField from 'components/UI/SelectField'
import CheckBoxField from 'components/UI/CheckBoxField'
import {Collection, CollectionItem} from 'components/UI/Collection'

export default {
  UI: {
    ...theme,
    theme: theme.theme,
    colors,

    A,
    Button,
    ButtonColors,
    FlattButton,
    Icon,
    Tabs,
    Tab,
    Chip,
    Webview,
    TextField,
    SelectField,
    CheckBoxField,
    Collection,
    CollectionItem
  }
}
