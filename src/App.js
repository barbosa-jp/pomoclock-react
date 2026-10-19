import PlayIcon from './assets/images/icon-play.svg';
import PauseIcon from './assets/images/icon-pause.svg'
import ColonImage from './assets/images/colon-image.svg';
import MusicIcon from './assets/images/icon-music.svg';
import SettingIcon from './assets/images/icon-settings.svg';
import ReloadIcon from './assets/images/relaod-icon.svg';
import FloatWindowIcon from './assets/images/float-window-icon.svg';

import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [bgPosition, setBgPosition] = useState('0% 50%');
  const [mode, setMode] = useState('Pomodoro');
  const [pomoCount, setPomoCount] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [progressBar, setProgressBar] = useState(850);
  const [autoStart, setAutoStart] = useState(false);

  useEffect(() => {
    getTimer(mode);
    if (autoStart) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
    setProgressBar(850);
  }, [mode])

  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(startTimer, 1000)

  const modes = ['Pomodoro', 'Short Break', 'Long Break'];
  const timers = [25, 5, 15];

  function changeMode(mode) {
    switch (mode) {
      case 'Pomodoro': 
        if (pomoCount < 2) {
          setPomoCount(pomoCount+1);
          setMode('Short Break');
        } else {
          setPomoCount(0);
          setMode('Long Break');
        }
        break;

      case 'Short Break':
        setMode('Pomodoro');
        break;

      case 'Long Break':
        setMode('Pomodoro');
        break;
    }

    setIsPaused(true);
  }

  function changeBackground(option) {
    switch (option) {
      case 'Pomodoro': 
        setBgPosition('0% 50%');
        break;
      
      case 'Short Break': 
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
      setMode(option);
      getTimer(option);
    }
  }

  function getTimer(mode) {
    const index = modes.indexOf(mode);
    setMinutes(timers[index]);
    setSeconds(0);
  }

  function startTimer() {
    if (!isPaused) {
      if (seconds - 1 < 0) {
        if (minutes-1 < 0) {
          changeMode(mode);
        } else {
          setMinutes(minutes-1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
      
      changeProgressBar();
    }
  }

  function formatTimer(time) {
    if (time < 10) {
      return `0${time}`;
    }

    return time;
  }

  function changeProgressBar() {
    const total = 850;
    const index = modes.indexOf(mode);
    const maxSeconds = timers[index] * 60;
    const percent = 100 / maxSeconds; 
    const currentProgress = progressBar - (total * percent/100);
    
    setProgressBar(currentProgress);
  }

  function reloadTimer(mode) {
    getTimer(mode);
    setIsPaused(true);
    setProgressBar(850);
  }

  return (
    <div className='background' style={{ backgroundPosition: `${bgPosition}`}}>
      <div className={`app`}>
        <header className="header">
          <h1>Pomoclock</h1>
        </header>
        <main className="main">
          <ul className="options-timer">
            {
              modes.map((option) => {
                if (mode === option) {
                  return <li key={option}><button className='button button-timer selected' type='button' onClick={(e) => changeOptionTimer(e.target, option)}>{option}</button></li>
                }
                return <li key={option}><button className='button button-timer' type='button' onClick={(e) => changeOptionTimer(e.target, option)}>{option}</button></li>
              })
            } 
          </ul>
          <div className='timer'>
            <div className='numbers'>
              <p className='minute'>{formatTimer(minutes)}</p>
              <img className='colon' src={ColonImage}/>
              <p className='seconds'>{formatTimer(seconds)}</p>
            </div>
            <svg className='circle' width='100%' height='100%'>
              <circle className='circular-progress' cx='50%' cy='50%' r='46%' style={{strokeDasharray: 850, strokeDashoffset: `${850 - progressBar}`}}/>
              <circle className='circle-background' cx='50%' cy='50%' r='46%'/>
            </svg>
          </div>
          <div className='buttons-timer'>
            <button className='button side-button'>
              <img className='icon' src={FloatWindowIcon}/>
            </button>
            {
              isPaused ? 
              <button className='button button-start' type='button' onClick={() => setIsPaused(!isPaused)}>
                <img className='icon' src={PlayIcon}/>
                START
              </button> :
              <button className='button button-start' type='button' onClick={() => setIsPaused(!isPaused)}>
                <img className='icon' src={PauseIcon}/>
                PAUSE
              </button>
            }
            <button className='button side-button' onClick={() => reloadTimer(mode)}>
              <img className='icon' src={ReloadIcon}/>
            </button>
          </div>
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
