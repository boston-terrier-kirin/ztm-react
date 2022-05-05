import React from 'react';
import CardList from './components/card-list/card-list';
import Dummy from './components/card-list/dummy';
import SearchBox from './components/search-box/search-box';

import './App.css';

class App extends React.Component {
  constructor() {
    console.log('App.constructor');
    super();

    this.state = {
      searchTerm: '',
      monsters: [],
    };
  }

  componentDidMount() {
    console.log('App.componentDidMount');

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) => {
        this.setState(
          () => {
            console.log('App.componentDidMount.setState1');
            return { monsters: users, filteredMonsters: users };
          },
          () => {
            console.log('App.componentDidMount.setState2');
          }
        );
      });
  }

  /**
   * onChangeに直接書くのではなく、外出しにしておけば、関数が1回しか作られないので、性能は良くなるらしい。
   */
  onSearchChange = (event) => {
    const searchTerm = event.target.value.toLocaleLowerCase();
    this.setState(
      () => {
        console.log('App.onSearchChange_1');
        return { searchTerm };
      },
      () => {
        console.log('App.onSearchChange_2');
      }
    );
  };

  render() {
    console.log('App.render');

    const { searchTerm, monsters } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchTerm)
    );

    return (
      <div>
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
          className="monsters-search-box"
        />
        <Dummy />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
