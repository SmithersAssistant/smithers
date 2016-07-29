import {StyleSheet} from 'aphrodite';
import {color, rgba, theme} from 'styles/theme';

export default StyleSheet.create({
  toolbar: {
    borderTop: `1px solid ${color('grey', 300)}`,
    backgroundColor: `${rgba(color('grey', 300), 0.6)}`,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    height: theme.footerHeight,
    padding: (theme.padding * 1.8) / 4.5,
    zIndex: 998
  }
})
