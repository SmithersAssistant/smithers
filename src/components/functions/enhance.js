export default (Component, enhancers = []) => {
  return enhancers.reduce((acc, enhancer) => enhancer(acc), Component)
}
