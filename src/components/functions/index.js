export const deleteProps = (component, toBeDeleted) => {
  let returnProps = {
    ...component
  }

  toBeDeleted.forEach(prop => {
    delete returnProps[prop]
  })

  return returnProps
}


/**
 * Copyright https://github.com/bevacqua/fuzzysearch
 */
export const fuzzysearch = (needle, haystack) => {
  var hlen = haystack.length;
  var nlen = needle.length;

  if (nlen > hlen) {
    return false;
  }

  if (nlen === hlen) {
    return needle === haystack;
  }

  outer: for (var i = 0, j = 0; i < nlen; i++) {
    var nch = needle.charCodeAt(i);
    while (j < hlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }

    return false;
  }

  return true;
};
