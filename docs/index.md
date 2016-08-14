## Documentation

Smithers is your personal assistant. Without plugins it is not as smart as you would like. This is where plugins make a huge impact. Every plugin should export a function and that's about it.

### Your First Plugin

All plugins should export a function, this function has 1 argument, a robot. More information about the robot can be found here: TODO : Add Robot information.

```js
export default (robot) => {

}
```

### Robot

The robot is the key to plugins, this is the interface between the assistant and your plugin.

### Events

### Cards

### UI

Robot.UI is a set of some UI components and usefull functions it includes:

- `A`: a link tag, with applied styles. It handles onclick events
- `Button`:
- `ButtonColors`:
- `Collection`:
- `CollectionItem`:
- `FlatButton`:
- `Icon`:
- `Tab`:
- `Tabs`:
- `Webview`:
- `Color`:
- `Colors`:

- `StyleSheet`: StyleSheet function from [aphrodite](https://npm.im/aphrodite)
- `css`: css function from [aphrodite](https://npm.im/aphrodite)
- `darken`:
- `ligthen`:
- `material`: all elements of [Material-UI](http://www.material-ui.com/)
- `px`: function that adds px at the end: `px(1, 2, 3, 4) => '1px 2px 3px 4px'`
- `rgba`: function to apply an alpha value `rgba('black', 0.6) => 'rgba(0, 0, 0, 0.6)'`
- `sum`: function to sum up all values `sum(1, 2, 3) => 6`
- `theme`: an object with sizes and colors

```js
const UIElements = robot.UI;
```
