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
    if (window.Telegram && window.Telegram.WebApp) {
      const WebApp = window.Telegram.WebApp;

      WebApp.ready(); 

      const initData = WebApp.WebAppChat;

      if (initData.id) {
        setInitDataValue(initData.id);
      } else {
        console.error("Oggetto 'chat' non trovato. Probabilmente la TWA è stata avviata da una chat privata senza contesto o non ha i permessi.");
      }
    } else {
      console.error("API Telegram WebApp non trovata. Sei sicuro che l'app sia in esecuzione all'interno di Telegram?");
    }  
  },[])

  const handleSearchClick = () => {
    fetchData(selectValue, inputValue);
  };

  return (
    <div className='main_screen'>
      <h1>{initDataValue}</h1>
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
      {data && <CardList items={data} chatId={initDataValue}/>} 
    </div>
  );
}

export default App;
