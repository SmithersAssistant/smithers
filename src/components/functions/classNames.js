import flatten from 'lodash/flattenDeep'

export default (...classNames) => {
  return (flatten(classNames))
    .filter(x => !(x === undefined || x === null || x === false))
    .join(' ')
}
