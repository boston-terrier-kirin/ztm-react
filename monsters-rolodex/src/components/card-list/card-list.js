import React from 'react';
import Card from '../card/card';
import './card-list.styles.css';

class CardList extends React.Component {
  render() {
    console.log('CardList.render', this.props.monsters);

    const monstersToRender = this.props.monsters.map((monster) => (
      <Card
        key={monster.id}
        title={monster.name}
        description={monster.email}
        imageUrl={`https://robohash.org/${monster.id}?set=set2&size=180x180`}
      />
    ));

    return <div className="card-list">{monstersToRender}</div>;
  }
}

export default CardList;
