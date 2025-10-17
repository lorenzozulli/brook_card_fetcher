import React from 'react'
import { useState, useEffect } from 'react'

function SearchCardData() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 
    const fetchData = async (selectValue, inputValue) => {
      if (!selectValue || !inputValue) {
        setError("Seleziona un'opzione e inserisci un valore.");
        return;
      }

    setIsLoading(true);
    setError(null);
    setData(null);
    
    try {
        const res = await fetch(`https://apitcg.com/api/${selectValue}/cards?name=${inputValue}`, {
          headers: {
            "x-api-key" : `${process.env.REACT_APP_API_KEY}`
          }
        })
        const response = await res.json()
        console.log(response.data)
        setData(response.data)
      } catch (error) {
       console.error("ERRORE DI CONNESSIONE AL PROXY ESTERNO:", error.stack); 
      }
    }
    return { data, fetchData };
}

export default SearchCardData