import './App.css';
import Button from './Components/Button/Button';
import Card from './Components/Card/Card';
import CardList from './Components/CardList/CardList';
import Input from './Components/Input/Input'
import Select from './Components/Select/Select'
import SearchCardData from './Hooks/SearchCardData'

import { useState, useEffect } from "react"

function App() {
  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [initDataValue, setInitDataValue] = useState('');

  const { data, isLoading, error, fetchData } = SearchCardData();

  useEffect (() => {
    const tg = window.Telegram;

    tg.ready();
    setInitDataValue(tg.WebAppChat.id);

  },[])

  const handleSearchClick = () => {
    fetchData(selectValue, inputValue);
  };

  return (
    <div className='main_screen'>
      <h1>{initDataValue || 'Dashboard'}</h1>
      <Select selectValue={selectValue}
        onChange={(e)=>setSelectValue(e.target.value)} 
      />
      <Input inputValue={inputValue}
        onChange={(e)=>setInputValue(e.target.value)} 
      />

     <Button 
        title={'Search'}
        onClick={handleSearchClick} 
        disabled={isLoading || !selectValue || !inputValue}
      >
        {isLoading ? 'Loading...' : 'Search'}
      </Button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!data && !isLoading && !error && <p>Select the query parameters and click the Search button.</p>}
      {data && <CardList items={data}/>} 
    </div>
  );
}

export default App;
