import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import Schedule from './ScheduleSelection'

function App() {
  const [language, setLanguage] = useState('english')

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="greeting">{language === 'english' ? 'Hello!' : language === 'spanish' ? "¡Hola!" : 'Hola!'}</h1>
        <div className="language-selection">
        <select value={language} onChange={handleLanguageChange}>
          <option value="english">English</option>
          <option value="spanish">Español</option>
          <option value="catalan">Català</option>
        </select>
        </div>
        <Schedule language={language}/>
        </header>
        
    </div>
  );
}

export default App;
