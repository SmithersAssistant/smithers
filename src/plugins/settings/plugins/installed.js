import React from 'react';

export default ({state, setState, robot}) => {

  const {
    Collection,
    CollectionItem
  } = robot.UI;

  return (
    <Collection>
      {robot.plugins().map((plugin, i) => (
        <CollectionItem key={i}>
          {plugin.name}
        </CollectionItem>
      ))}
    </Collection>
  )
}
