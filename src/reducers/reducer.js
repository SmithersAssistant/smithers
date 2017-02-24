const reducer = (patterns = {}, defaultState) => {
  return (state = defaultState, action = {}) => {
    if (!Object.keys(patterns).includes(action.type)) {
      return state
    }

    return patterns[action.type](state, action)
  }
}

export default reducer
