import React from 'react';
import {FiSearch} from 'react-icons/fi';
import './styles.css';
import { useState } from 'react'
import api from './services/api'
document.addEventListener("keypress", (e) => {
  if(e.key === "Enter"){    
  const btn = document.querySelector("#btnSearch");
  btn.click();
  }
});


function App() {

    const [input, setInput] = useState('')
    const [cep, setCep] = useState({})
    const handleSearch = async () =>{      
      if(input === ""){
        alert("Favor informar algum CEP!")
        return; 
      }
      try{
        const response = await api.get(`${input}/json`);          
        setCep(response.data)
        let erro = response.data        
        if(erro.erro === true){
          alert('Erro ao buscar CEP!')
          setInput('')
          setCep('')
          return;          
        }
      setInput('')       
      }
      catch{
        alert('Erro ao buscar CEP!')
        setCep('')
        setInput('')
      }
    }
   

  return (
    <div className="container">
        <h1 className="title">Buscador de CEP</h1>
        <div className="containerInput">
          <input type="text"
          placeholder="Digite seu CEP com apenas números:"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
          <button className="buttonSearch" id='btnSearch' onClick={handleSearch}>
            <FiSearch size={25} color="#fff"/>
          </button>
        </div>
        {Object.keys(cep).length > 0 &&(
          <main className='main none'>
            <h2>CEP: {cep.cep}</h2>
            <span>Rua: {cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade: {cep.localidade} UF: {cep.uf}</span>
        </main>
        )}
        
    </div>
  );
}

export default App;
