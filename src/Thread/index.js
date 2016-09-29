function removeCommentsFromSource (str) {
  return str.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '$1')
}

function getFunctionBody (fn) {
  var s = removeCommentsFromSource(fn.toString())
  return s.substring(s.indexOf('{') + 1, s.lastIndexOf('}'))
}

class Thread {
  constructor (fn) {
    const fnBody = getFunctionBody(fn)

    return new window.Worker(window.URL.createObjectURL(
      new window.Blob([fnBody], {
        type: 'text/javascript'
      })
    ))
  }
}

export default Thread

// USAGE:
// ------
// let worker = new Thread((self) => {
//   self.onmessage = (e) => {
//     console.log(e.data)
//   }
// })
//
// worker.postMessage(arg)
