export default (...classNames) => {
  return classNames.filter(x => !!x).join(' ')
}
