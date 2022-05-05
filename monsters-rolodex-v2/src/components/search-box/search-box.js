import React from 'react';
import './search-box.styles.css';

class SearchBox extends React.Component {
  render() {
    console.log('SearchBox.render', this.props);

    return (
      <input
        type="search"
        className={`search-box ${this.props.className}`}
        placeholder={this.props.placeholder}
        onChange={this.props.onChangeHandler}
      />
    );
  }
}

export default SearchBox;
