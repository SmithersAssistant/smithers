import React from 'react'
import {deleteProps} from '../functions'
import {parse} from 'url'
import {shell} from 'electron'

const noop = () => {
}

class Webview extends React.Component {
  static defaultProps = {
    whenLoading: undefined,
    onWillNavigate: noop,
    onDidNavigate: noop,
    onDidStartLoading: noop,
    onDidStopLoading: noop,
    onDidNavigateInPage: noop,
    onDidGetResponseDetails: noop,
    onLoadCommit: noop
  };

  state = {
    isLoading: false
  };

  componentDidMount () {
    this.attachListeners()

    this._onVisibilityChangeHandler = this.onVisibilityChange(this.refs.webview, () => {
      this.triggerReflow()
    })

    this._onVisibilityChangeHandlerInterval = setInterval(() => {
      (this._onVisibilityChangeHandler || noop)()
    }, 600)
  }

  componentWillUnmount () {
    this.removeEventListeners()
    clearInterval(this._onVisibilityChangeHandlerInterval)
  }

  getEvents = () => {
    return [{
      key: 'wil-navigate',
      cb: this.props.onWillNavigate
    }, {
      key: 'did-navigate',
      cb: this.props.onDidNavigate
    }, {
      key: 'did-start-loading',
      cb: (...args) => {
        this.startLoading()
        this.props.onDidStartLoading(...args)
      }
    }, {
      key: 'did-stop-loading',
      cb: (...args) => {
        this.stopLoading()
        this.props.onDidStopLoading(...args)
      }
    }, {
      key: 'did-navigate-in-page',
      cb: this.props.onDidNavigateInPage
    }, {
      key: 'new-window',
      cb: this.newWindowEventListener
    }, {
      key: 'did-get-response-details',
      cb: this.props.onDidGetResponseDetails
    }, {
      key: 'load-commit',
      cb: this.props.onLoadCommit
    }]
  };

  attachListeners = () => {
    this.getEvents().map(event => {
      this.callMethod('addEventListener', event.key, event.cb)
    })
  };

  callMethod = (method, ...args) => {
    return this.refs.webview && this.refs.webview[method](...args)
  };

  canGoBack = () => {
    return this.callMethod('canGoBack')
  };

  canGoForward = () => {
    return this.callMethod('canGoForward')
  };

  goBack = () => {
    return this.callMethod('goBack')
  };

  goForward = () => {
    return this.callMethod('goForward')
  };

  newWindowEventListener = (e) => {
    try {
      const protocol = parse(e.url).protocol

      if (!['http:', 'https:', 'mailto:'].includes(protocol)) {
        throw new Error('invalid protocol')
      }

      shell.openExternal(e.url)
    } catch (err) {
      console.log(`Ignoring ${e.url} due to ${err.message}`)
    }
  };

  reload = () => {
    this.callMethod('reload')
  };

  removeEventListeners = () => {
    this.getEvents().map(event => {
      this.refs.webview.removeEventListener(event.key, event.cb)
    })
  };

  startLoading = () => {
    this.setState({isLoading: true})
  };

  stopLoading = () => {
    this.setState({isLoading: false})
  };

  renderWebview = (props) => {
    return (
      <webview
        {...props}
        ref='webview'
      />
    )
  };

  triggerReflow = () => {
    try {
      const {webview} = this.refs

      if (webview) {
        const el = webview.shadowRoot.lastChild

        el.style.flex = '0 1'
        el.offsetHeight // no need to store this anywhere, the reference is enough
        el.style.flex = '1 1 auto'
      }
    } catch (err) {
      console.log(err)
    }
  };

  isElementInViewport = (el) => {
    if (!el) {
      return false
    }

    var rect = el.getBoundingClientRect()
    var vWidth = window.innerWidth || document.documentElement.clientWidth
    var vHeight = window.innerHeight || document.documentElement.clientHeight
    var efp = (x, y) => document.elementFromPoint(x, y)

    // Return false if it's not in the viewport
    if (
      rect.right < 0 ||
      rect.bottom < 0 ||
      rect.left > vWidth ||
      rect.top > vHeight
    ) {
      return false
    }

    // Return true if any of its four corners are visible
    return (
      el.contains(efp(rect.left, rect.top)) ||
      el.contains(efp(rect.right, rect.top)) ||
      el.contains(efp(rect.right, rect.bottom)) ||
      el.contains(efp(rect.left, rect.bottom))
    )
  };

  onVisibilityChange = (el, callback) => {
    var oldVisible

    return () => {
      var visible = this.isElementInViewport(el)

      if (visible !== oldVisible) {
        oldVisible = visible
        if (typeof callback === 'function') {
          callback()
        }
      }
    }
  };

  render () {
    let {isLoading} = this.state
    let props = deleteProps(this.props, [
      'whenLoading', 'onWillNavigate', 'onDidGetResponseDetails',
      'onDidNavigate', 'onDidStartLoading', 'onDidStopLoading',
      'onDidNavigateInPage', 'onLoadCommit'
    ])

    return this.props.whenLoading === undefined ? (
      this.renderWebview(props)
    ) : (
      <div>
        {isLoading && this.props.whenLoading}

        {this.renderWebview(props)}
      </div>
    )
  }
}

export default Webview
