import React, { useState, useEffect } from 'react';


function Schedule({ language }) {
  const days = {
    'english': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    'spanish': ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    'catalan': ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge']
  };
  const times = Array.from({length: 48}, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return hour < 10 ? `0${hour}:${minute}` : `${hour}:${minute}`;
  });

  const [selectedTimes, setSelectedTimes] = useState({});

  useEffect(() => {
    setSelectedTimes(
      days[language].reduce((acc, day) => ({ ...acc, [day]: { lunch: { start: '', end: '' }, dinner: { start: '', end: '' } } }), {})
    );
  }, [language]);

  const handleTimeChange = (day, meal, period, time) => {
    setSelectedTimes(prevTimes => ({
      ...prevTimes,
      [day]: {
        ...prevTimes[day],
        [meal]: {
          ...prevTimes[day][meal],
          [period]: time
        }
      }
    }));
  };

  return (
    <div className="Schedule">
      <h2>{language === 'english' ? 'Choose Hours:' : language === 'spanish' ? 'Elegir Horas:' : 'Seleccionar Hores:'}</h2>
      {days[language].map(day => (
        <div key={day} className="day-row">
          <label>{day}: </label>
          <div className="select-group">
          <select 
            className="select-style"
            onChange={e => handleTimeChange(day, 'lunch', 'start', e.target.value)}>
            {times.map(time => <option key={time}>{time}</option>)}
          </select>
          {language === 'english' ? '  to  ' : '  a  '}
          <select
            className="select-style" 
            onChange={e => handleTimeChange(day, 'lunch', 'end', e.target.value)}>
            {times.map(time => <option key={time}>{time}</option>)}
          </select>
          {language === 'english' ? ' and ' : language === 'spanish' ? ' y ' : ' i '}
          <select 
            className="select-style"
            onChange={e => handleTimeChange(day, 'dinner', 'start', e.target.value)}>
            {times.map(time => <option key={time}>{time}</option>)}
          </select>
          {language === 'english' ? '  to  ' : '  a  '}
          <select 
            className="select-style"
            onChange={e => handleTimeChange(day, 'dinner', 'end', e.target.value)}>
            {times.map(time => <option key={time}>{time}</option>)}
          </select>
          </div>
        </div>
      ))}
      <button className="submit-button" onClick={() => console.log(selectedTimes)}>{language === 'english' ? 'Submit' : language === "spanish" ? 'Entregar' : 'Presentar'}</button>
    </div>
  );
}

export default Schedule;