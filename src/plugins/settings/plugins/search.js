import React from 'react';

const SearchPlugins = React.createClass({
  componentDidMount() {
    this.searchByKeyword('smithers')
      .then(result => result.rows.map(item => item.key[item.value]));
  },
  searchByKeyword(keyword) {
    const {robot} = this.props;

    return robot.fetchJson(`https://registry.npmjs.org/-/_view/byKeyword?startkey=[%22${keyword}%22]&endkey=[%22${keyword}%22,{}]&group_level=3`)
  },
  render() {
    return (
      <div>Search Plugins</div>
    );
  }
});

export default SearchPlugins;
