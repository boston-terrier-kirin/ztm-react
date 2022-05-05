import React from 'react';

class App extends React.Component {
  constructor() {
    console.log('constructor');
    super();

    this.state = {
      searchTerm: '',
      monsters: [],
    };
  }

  componentDidMount() {
    console.log('componentDidMount');

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) => {
        this.setState(
          () => {
            console.log('componentDidMount.setState1');
            return { monsters: users, filteredMonsters: users };
          },
          () => {
            console.log('componentDidMount.setState2');
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
        console.log('onSearchChange_1');
        return { searchTerm };
      },
      () => {
        console.log('onSearchChange_2');
      }
    );
  };

  render() {
    console.log('render');

    const { searchTerm, monsters } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchTerm)
    );

    const monstersToRender = filteredMonsters.map((monster) => (
      <div key={monster.id}>{monster.name}</div>
    ));

    return (
      <div>
        <input
          type="text"
          className="search-box"
          placeholder="search monster"
          onChange={onSearchChange}
        />
        {monstersToRender}
      </div>
    );
  }
}

export default App;
