import React from 'react'
import debounce from 'lodash/debounce'
import config from 'config'
import marked from 'marked'
import {shell} from 'electron'
import md5 from 'md5'
import getPackageReadme from 'get-package-readme'
import styles from './searchStyles'
import {enhance, restorableComponent} from 'components/functions'

const SEARCH_COMPONENT = 'com.robinmalfait.spm.search'

export default robot => {
  const {Blank} = robot.cards
  const {A, withStyles} = robot.UI
  const {TextField, Dialog, Checkbox} = robot.UI.material

  const BASE = 'https://api.npms.io/search'
  const mandatoryKeywords = ['smithers', 'plugin']

  class Search extends React.Component {
    static defaultProps = {
      q: ''
    };

    state = {
      query: this.props.q,
      results: [],
      active: undefined,
      start: 0,
      itemsPerPage: 25,
      filters: {
        installed: true,
        notInstalled: true
      }
    };

    componentWillMount () {
      this.search = debounce(this.search, 500)

      this.search()
    }

    isInstalled = (plugin) => {
      return config.get('plugins.external').includes(plugin)
    };

    search = () => {
      return robot.fetchJson(`${BASE}?${robot.httpBuildQuery({
        size: this.state.itemsPerPage,
        from: this.state.start,
        term: `${this.state.query} ${mandatoryKeywords.join(',')}`
      })}`)
        .then(({results}) => {
          this.setState({results: results.map(({module}) => {
            const keywords = (module.keywords || []).filter(keyword => !mandatoryKeywords.includes(keyword))

            // Filter out plugins that don't have the [plugin, smithers] keywords
            if (!mandatoryKeywords.every(mandatoryKeyword => (module.keywords || []).includes(mandatoryKeyword))) {
              return undefined
            }

            this.fetchReadme(module.name)

            return {
              name: module.name,
              keywords,
              version: module.version,
              description: module.description,
              author: module.publisher,
              readme: undefined,
              rendered: undefined
            }
          }).filter(x => !!x)})
        })
    };

    fetchReadme = (name) => {
      getPackageReadme(name, (err, readme) => {
        if (!err) {
          this.setState({
            results: this.state.results.map(result => {
              if (result.name === name) {
                return {
                  ...result,
                  readme,
                  rendered: marked(readme)
                }
              }

              return result
            })
          })
        }
      })
    };

    handleChange = (value) => {
      this.setState({query: value})
      this.search()
    };

    applyFilters = (items) => {
      return items.filter(item => {
        const isInstalled = this.isInstalled(item.name)

        if (isInstalled) {
          return this.state.filters.installed
            ? item
            : undefined
        }

        return this.state.filters.notInstalled
          ? item
          : undefined
      }).filter(x => !!x)
    };

    renderItem = (item) => {
      const {styles} = this.props

      return (
        <div>
          <div className={styles.title}>
            <A
              target='_blank'
              href={`https://www.npmjs.com/~${item.author.username}`}
              title={item.author.username}
            >
              <img
                className={styles.authorImage}
                src={`https://s.gravatar.com/avatar/${md5(item.author.email)}?size=24&default=retro`}
                title={item.author.username}
                alt={item.author.username}
              />
            </A>
            <A target='_blank' href={`https://www.npmjs.com/package/${item.name}`}>{item.name}</A>
            <span className={styles.version}>v{item.version}</span>
            {this.isInstalled(item.name) && <span className={styles.badge}>installed</span>}
          </div>
          <div className={styles.contents}>
            <p className={styles.description}>{item.description}</p>

            <div className={styles.keywords}>
              {(item.keywords || []).map(keyword => (
                <A target='_blank' href={`https://www.npmjs.com/search?q=${keyword}`} key={keyword} className={styles.keyword}>{keyword}</A>
              ))}
            </div>

            <div className={styles.actions}>
              <A onClick={() => {
                robot.execute(`${this.isInstalled(item.name) ? 'uninstall' : 'install'} ${item.name}`)
              }} className={styles.action}>{this.isInstalled(item.name) ? 'Uninstall' : 'Install'}</A>
              {item.readme && (
                <A onClick={() => this.setState({active: item})} className={styles.action}>Read Me</A>
              )}
            </div>
          </div>
        </div>
      )
    };

    render () {
      const {styles, ...other} = this.props
      let {query, results} = this.state
      const props = robot.deleteProps(other, [
        'q'
      ])

      results = this.applyFilters(results)

      return (
        <Blank
          title='Searching plugins'
          {...props}
        >
          <TextField
            id='query'
            name='query'
            type='text'
            floatingLabelText='Search Query'
            value={query}
            onChange={(event, newValue) => this.handleChange(newValue)}
            autoFocus
            fullWidth
          />

          <div className={styles.filters}>
            Show:

            <Checkbox
              className={styles.filter}
              checked={this.state.filters.installed}
              onCheck={(event, checked) => {
                this.setState({
                  filters: {
                    ...this.state.filters,
                    installed: checked
                  }
                })
              }}
              label='installed'
            />
            <Checkbox
              className={styles.filter}
              checked={this.state.filters.notInstalled}
              onCheck={(event, checked) => {
                this.setState({
                  filters: {
                    ...this.state.filters,
                    notInstalled: checked
                  }
                })
              }}
              label='not installed'
            />
          </div>
          <span className='right'>{results.length} result{results.length === 1 ? '' : 's'}</span>

          <ul className={styles.wrapper}>
            {results.length > 0 && results.map((item, i) => (
              <li key={i} className={styles.item}>
                {this.renderItem(item, i)}
                <div
                  style={{display: 'none'}}
                  dangerouslySetInnerHTML={{__html: item.rendered}}
                />
                <div className={styles.clean} />
              </li>
            ))}
          </ul>

          {results.length <= 0 && (
            <div>There are no plugins available{!Object.keys(this.state.filters).some(filter => this.state.filters[filter]) ? ', but it looks like all the filters are unchecked!' : ''}</div>
          )}

          {this.state.active && (
            <Dialog
              open
              autoScrollBodyContent
              title={this.state.active.name}
              onRequestClose={() => this.setState({active: undefined})}
            >
              <div
                className={`max-100-percent ${styles.readme}`}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  let found = false
                  let node = event.target
                  while (node !== event.currentTarget && !found) {
                    if (node.tagName === 'A') {
                      found = true
                      break
                    }
                    node = node.parentNode
                  }

                  if (found) {
                    shell.openExternal(node.href)
                  }
                }}
                dangerouslySetInnerHTML={{__html: this.state.active.rendered}}
              />
            </Dialog>
          )}
        </Blank>
      )
    }
  }

  robot.registerComponent(enhance(Search, [
    restorableComponent,
    withStyles(styles)
  ]), SEARCH_COMPONENT)

  robot.listen(/^search ?(.*)?$/, {
    description: 'Search for available plugins',
    usage: 'search <query?>'
  }, (res) => {
    const {query = ''} = res.matches

    robot.addCard(SEARCH_COMPONENT, {q: query})
  })
}
