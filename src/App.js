import './App.css';
import Button from './Components/Button/Button';
import Card from './Components/Card/Card';
import CardList from './Components/CardList/CardList';
import Input from './Components/Input/Input'
import Select from './Components/Select/Select'
import SearchCardData from './Hooks/SearchCardData'

import { useState } from "react"

function App() {

  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { data, isLoading, error, fetchData } = SearchCardData();

  const handleSearchClick = () => {
    fetchData(selectValue, inputValue);
  };

  return (
    <>
      <h1>Dashboard</h1>
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
        {isLoading ? 'Caricamento...' : 'Cerca Dati'}
      </Button>

      {error && <p style={{ color: 'red' }}>Errore: {error}</p>}
      {!data && !isLoading && !error && <p>Select the query parametrs and click the Search button.</p>}
      {data && <CardList items={data} />} 
    </>
  );
}

export default App;
