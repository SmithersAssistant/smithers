const deleteProps = (component, toBeDeleted) => {
  let returnProps = {
    ...component
  }

  toBeDeleted.forEach(prop => {
    delete returnProps[prop]
  })

  return returnProps
}

export default deleteProps
