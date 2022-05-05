import './search-box.styles.css';

const SearchBox = (props) => {
  console.log('SearchBox', props);

  return (
    <input
      type="search"
      className={`search-box ${props.className}`}
      placeholder={props.placeholder}
      onChange={props.onChangeHandler}
    />
  );
};

export default SearchBox;
