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

  const [initDataValue, setChatId] = useState('');

  const { data, isLoading, error, fetchData } = SearchCardData();

 useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
          const WebApp = window.Telegram.WebApp;
          WebApp.ready();

          const initData = WebApp.initDataUnsafe;
          const groupChatId = initData?.chat?.id; 
          const userChatId = initData?.user?.id;
          
          if (groupChatId) {
            setChatId(groupChatId);
            console.log("ID Chat Trovato (Gruppo/Canale):", groupChatId);
          } else if (userChatId) {
            setChatId(userChatId);
            console.error("Oggetto 'chat' assente. Ho usato l'ID UTENTE come ID di fallback per la chat privata.");
            console.log("ID Chat Trovato (Privata/Fallback):", userChatId);
          } else {
            console.error("Dati di inizializzazione Telegram incompleti. Impossibile trovare un ID valido.");
          }
        } else {
          console.error("L'API Telegram WebApp non è disponibile.");
        }
    }, []);
    
  const handleSearchClick = () => {
    fetchData(selectValue, inputValue);
  };

  return (
    <div className='main_screen'>
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
        {isLoading ? 'Loading...' : 'Search'}
      </Button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!data && !isLoading && !error && <p>Select the query parameters and click the Search button.</p>}
      {data && <CardList items={data} chatId={initDataValue}/>} 
    </div>
  );
}

export default App;
