import Card from '../card/card';
import './card-list.styles.css';

const CardList = (props) => {
  console.log('CardList', props.monsters);

  const monstersToRender = props.monsters.map((monster) => (
    <Card
      key={monster.id}
      title={monster.name}
      description={monster.email}
      imageUrl={`https://robohash.org/${monster.id}?set=set2&size=180x180`}
    />
  ));

  return <div className="card-list">{monstersToRender}</div>;
};

export default CardList;
