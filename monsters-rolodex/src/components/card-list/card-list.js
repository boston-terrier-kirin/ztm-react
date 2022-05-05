import React from 'react';

class CardList extends React.Component {
  render() {
    console.log('CardList.render', this.props.monsters);

    const monstersToRender = this.props.monsters.map((monster) => (
      <div key={monster.id}>{monster.name}</div>
    ));

    return <div>{monstersToRender}</div>;
  }
}

export default CardList;
