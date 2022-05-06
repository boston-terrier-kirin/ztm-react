import { ChangeEvent, useEffect, useState } from 'react';
import CardList from './components/card-list/card-list';
import Dummy from './components/card-list/dummy';
import SearchBox from './components/search-box/search-box';
import './App.css';
import { getData } from './utils/data.utils';

export interface IMonster {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  console.log('App');

  const [searchTerm, setSearchTerm] = useState('');
  const [monsters, setMonsters] = useState<IMonster[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    console.log('App.useEffect_1');

    const fetchUsers = async () => {
      const users = await getData<IMonster[]>(
        'https://jsonplaceholder.typicode.com/users'
      );

      setMonsters(users);
    };

    fetchUsers();
  }, []);

  // 検索条件が変わった場合のみfilterを走らせたいので、useEffectを使う。
  useEffect(() => {
    console.log('App.useEffect_2');

    const filtered = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchTerm)
    );
    setFilteredMonsters(filtered);
  }, [searchTerm, monsters]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('App.onSearchChange');

    const value = event.target.value.toLocaleLowerCase();
    setSearchTerm(value);
  };

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
};

export default App;
