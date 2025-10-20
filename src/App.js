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
        // 1. PRIMO CHECK: Verifica se l'ambiente è il browser e l'API TWA è disponibile
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
            
            const WebApp = window.Telegram.WebApp;
            WebApp.ready(); 
            
            // Usiamo una variabile temporanea per chiarezza
            const initData = WebApp.initDataUnsafe;

            // 2. LOGICA ROBUSTA CON OPTIONAL CHAINING
            
            // Tentiamo di prendere l'ID della CHAT (Gruppo/Canale)
            const groupChatId = initData?.chat?.id; 
            
            // Tentiamo di prendere l'ID dell'UTENTE (Fallback per Chat Privata)
            const userChatId = initData?.user?.id;
            
            if (groupChatId) {
                // Trovato l'ID del Gruppo/Canale (ID negativo)
                setChatId(groupChatId);
                console.log("ID Chat Trovato (Gruppo/Canale):", groupChatId);

            } else if (userChatId) {
                // Trovato l'ID Utente (usato come ID Chat Privata)
                setChatId(userChatId);
                setError("Oggetto 'chat' assente. Ho usato l'ID UTENTE come ID di fallback per la chat privata.");
                console.log("ID Chat Trovato (Privata/Fallback):", userChatId);

            } else {
                // Nessun dato utile trovato (es. App avviata in modo anomalo o dati mancanti)
                setError("Dati di inizializzazione Telegram incompleti. Impossibile trovare un ID valido.");
            }

        } else {
            // App avviata al di fuori del contesto Telegram o API non caricata
            setError("L'API Telegram WebApp non è disponibile.");
        }
    }, []); 

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
