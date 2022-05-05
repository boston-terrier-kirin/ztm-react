import React from 'react';

class SearchBox extends React.Component {
  render() {
    console.log('SearchBox.render', this.props);

    return (
      <input
        type="search"
        className={this.props.className}
        placeholder={this.props.placeholder}
        onChange={this.props.onChangeHandler}
      />
    );
  }
}

export default SearchBox;
