import React from 'react';

class App extends React.Component {
  constructor() {
    console.log('constructor');
    super();

    this.state = {
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
            return { monsters: users };
          },
          () => {
            console.log('componentDidMount.setState2');
          }
        );
      });
  }

  render() {
    console.log('render');

    const monstersToRender = this.state.monsters.map((monster) => (
      <div key={monster.id}>{monster.name}</div>
    ));
    return <div>{monstersToRender}</div>;
  }
}

export default App;
