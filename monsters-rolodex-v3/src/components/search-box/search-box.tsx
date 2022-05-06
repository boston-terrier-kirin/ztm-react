import { ChangeEventHandler } from 'react';
import './search-box.styles.css';

interface ISearchBoxProps {
  className: string;
  placeholder: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
}

const SearchBox = (props: ISearchBoxProps) => {
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
