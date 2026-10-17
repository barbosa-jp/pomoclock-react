import PlayIcon from './assets/images/icon-play.svg';
import ColonImage from './assets/images/colon-image.svg';
import MusicIcon from './assets/images/icon-music.svg';
import SettingIcon from './assets/images/icon-settings.svg';

import './App.css';
import { useState } from 'react';

function App() {
  const [bgPosition, setBgPosition] = useState('0% 50%');

  function changeBackground(option) {
    switch (option) {
      case 'pomodoro': 
        setBgPosition('0% 50%');
        break;
      
      case 'short break': 
        setBgPosition('50% 50%');
        break;
      
      default: 
        setBgPosition('100% 50%')
    }
  }

  function changeOptionTimer(button, option) {
    const selectedEncontrado = button.className.indexOf('selected');
    if (selectedEncontrado === -1) {
      const allButtons = [...document.getElementsByClassName('button-timer')];
      allButtons.map((e) => e.className = 'button button-timer');
      button.className += ' selected';
      
      changeBackground(option);
    }
  }

  return (
    <div className='background' style={{ backgroundPosition: `${bgPosition}`}}>
      <div className={`app`}>
        <header className="header">
          <h1>Pomoclock</h1>
        </header>
        <main className="main">
          <ul className="options-timer">
            <li><button className='button button-timer selected' type='button' onClick={(e) => changeOptionTimer(e.target, 'pomodoro')}>Pomodoro</button></li>
            <li><button className='button button-timer' type='button' onClick={(e) => changeOptionTimer(e.target, 'short break')}>Short Break</button></li>
            <li><button className='button button-timer' type='button' onClick={(e) => changeOptionTimer(e.target, 'long break')}>Long Break</button></li>
          </ul>
          <div className='timer'>
            <div className='numbers'>
              <p className='hour'>15</p>
              <img className='colon' src={ColonImage}/>
              <p className='minute'>00</p>
            </div>
            <svg className='circle' width='100%' height='100%'>
              <circle className='circular-progress' cx='50%' cy='50%' r='46%'/>
              <circle className='circle-background' cx='50%' cy='50%' r='46%'/>
            </svg>
          </div>
          <button className='button button-start' type='button'>
            <img className='icon' src={PlayIcon}/>
            START
          </button>
        </main>
        <footer className="footer">
          <ul className='options'>
            <li><button className='button'><img className='icon' src={SettingIcon} /></button></li>
            <li><button className='button'><img className='icon' src={MusicIcon} /></button></li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

export default App;
