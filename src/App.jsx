import PlayIcon from './assets/images/icon-play.svg';
import PauseIcon from './assets/images/icon-pause.svg'
import ColonImage from './assets/images/colon-image.svg';
import MusicIcon from './assets/images/icon-music.svg';
import SettingIcon from './assets/images/icon-settings.svg';
import ReloadIcon from './assets/images/relaod-icon.svg';
import FloatWindowIcon from './assets/images/float-window-icon.svg';
import PlusIcon from './assets/images/icon-plus.svg';
import MinusIcon from './assets/images/icon-minus.svg';
import CloseIcon from './assets/images/icon-close.svg';
import PassIcon from './assets/images/icon-pass.svg';

import './App.css';
import { useState, useRef, useEffect, use } from 'react';
import { playSound } from 'react-sounds';
import { initTabSafeTimers } from '@vorthain/tab-safe-timers';
import { PictureInPicture } from 'popup-flutuante-react';

function App() {
  const [bgPosition, setBgPosition] = useState('0% 50%');
  const [mode, setMode] = useState('Pomodoro');
  const [pomoCount, setPomoCount] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [progressBar, setProgressBar] = useState(850);
  const [autoStart, setAutoStart] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState(['2E1C5B', '5E1C7B', 'C86272']);
  const [config, setConfig] = useState(false);
  const [timerPomo, setTimerPomo] = useState(25);
  const [timerSB, setTimerSB] = useState(5);
  const [timerLB, setTimerLB] = useState(15);

  const [floatingScreen, setFloatingScreen] = useState(false);

  useEffect(() => {
    initTabSafeTimers();
  }, [])

  useEffect(() => {
    getTimer(mode);
    setIsPaused(autoStart ? isPaused : true);
    setProgressBar(850);
    changeBackground(mode);
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

  const timers =[timerPomo, timerSB, timerLB];
  const modes = ['Pomodoro', 'Short Break', 'Long Break'];
  const themes = [
    ['2E1C5B', '5E1C7B', 'C86272'],
    ['0F133E', '1C7B75', '49964E'],
    ['390321', 'BF2856', 'D76B39'],
    ['0A6085', '96C6AE', 'FC57B2']
  ];

  function changeMode(mode) {
    switch (mode) {
      case 'Pomodoro': 
        if (pomoCount < 1) {
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

    playSound('notification/completed');
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

  function getModeTimer(mode) {
    const index = modes.indexOf(mode);
    return timers[index];
  }

  function changeModeTimer(mode, timer) {
    const index = modes.indexOf(mode);
    let newTimers = timers;
    newTimers[index] = timer;
    return newTimers
  }


  return (
    <div className='background' style={{ backgroundPosition: `${bgPosition}`, backgroundImage: `linear-gradient(to bottom right, #${selectedTheme[0]}, #${selectedTheme[1]}, #${selectedTheme[2]}, #${selectedTheme[2]})`}}>
      <div className={`app`}>
        <header className="header">
          <h1>Pomoclock</h1>
        </header>
        <main className="main">
          <div className={`settings ${config ? 'activate' : ''}`}>
            <div className='setting'>
              <p className='title'>Minutes</p>
              <ul className='setting-list'>
                {
                  modes.map((mode) => {
                    return <li key={mode}>
                      <p className='sub-title'>{mode}</p>
                      <div className='mode-minute-setting'>
                        <button className='button' onClick={() => {
                          switch(mode) {
                            case 'Pomodoro':
                              setTimerPomo(v => v + 1);
                              break;
                            case 'Short Break':
                              setTimerSB(v => v + 1);
                              break;
                            default:
                              setTimerLB(v => v + 1);
                              break;
                          }
                        }}>
                          <img className='icon' src={PlusIcon}/>
                        </button>

                        <input type='number' value={getModeTimer(mode)} onChange={(e) => {
                          const value = Number(e.target.value) || 0;
                          switch(mode) {
                            case 'Pomodoro':
                              setTimerPomo(parseInt(value));
                              break;
                            case 'Short Break':
                              setTimerSB(value);
                              break;
                            default:
                              setTimerLB(value);
                              break;
                          }
                          e.target.value = value;
                        }}/>
                        <button className='button' onClick={() => {
                          switch(mode) {
                            case 'Pomodoro':
                              setTimerPomo(v => v - 1);
                              break;
                            case 'Short Break':
                              setTimerSB(v => v - 1);
                              break;
                            default:
                              setTimerLB(v => v - 1);
                              break;
                          }
                        }}>
                          <img className='icon' src={MinusIcon}/>
                        </button>
                      </div>
                    </li>
                  })
                }
              </ul>
            </div>
            <div className='setting auto-start'>
              <p className='title'>Auto Start</p>
              <button className={`button autostart-${autoStart}`} onClick={() => setAutoStart(!autoStart)}>
                <div className='button-circle'></div>
              </button>
            </div>
            <div className='setting'>
              <p className='title'>Theme</p>
              <div className='themes'>
                {
                  themes.map((theme) => <button key={theme} className={`button ${theme.toString() === selectedTheme.toString() ? 'selected' : ''}`} onClick={() => setSelectedTheme(theme)} style={{ backgroundImage: `linear-gradient(to bottom right, #${theme[0]}, #${theme[1]}, #${theme[2]}, #${theme[2]})`}}></button>)
                }
              </div>
            </div>
          </div>
          <div className={`pomodoro ${config || 'activate'}`}>
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
              <button className='button side-button' onClick={() => setFloatingScreen(!floatingScreen)}>
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
          </div>
        </main>
        <footer className="footer">
          <ul className='options'>
            <li><button className='button' onClick={() => setConfig(!config)}><img className='icon' src={config ? CloseIcon : SettingIcon} /></button></li>
            <li><button className='button'><img className='icon' src={MusicIcon} /></button></li>
          </ul>
        </footer>
        <PictureInPicture
          isOpen={floatingScreen}
          onClose={() => setFloatingScreen(false)}
          width='320'
          height='240'
        >
          <div className='floating-screen' style={{ backgroundPosition: `${bgPosition}`, backgroundImage: `linear-gradient(to bottom right, #${selectedTheme[0]}, #${selectedTheme[1]}, #${selectedTheme[2]}, #${selectedTheme[2]})`}}>
            <header className="header floating-header">
              <h1>{mode}</h1>
            </header>
            <div className='timer floating-timer'>
              <div className='numbers floating-numbers'>
                <p className='minute'>{formatTimer(minutes)}</p>
                <img className='colon' src={ColonImage}/>
                <p className='seconds'>{formatTimer(seconds)}</p>
              </div>
              <svg className='circle floating-circle' width='100%' height='100%'>
                <circle className='circular-progress' cx='50%' cy='50%' r='46%' style={{strokeDasharray: 850, strokeDashoffset: `${850 - progressBar}`}}/>
                <circle className='circle-background' cx='50%' cy='50%' r='46%'/>
              </svg>
            </div>
            <div className='buttons-timer floating-button-timer'>
              <button className='button side-button' onClick={() => changeMode(mode)}>
                <img className='icon' src={PassIcon}/>
              </button>
              <button className='button side-button' type='button' onClick={() => setIsPaused(!isPaused)}>
              {
                isPaused ? 
                <img className='icon' src={PlayIcon}/>
                :
                <img className='icon' src={PauseIcon}/>
              }
              </button>
              <button className='button side-button' onClick={() => reloadTimer(mode)}>
                <img className='icon' src={ReloadIcon}/>
              </button>
            </div>
          </div>  
        </PictureInPicture>
      </div>
    </div>
  );
}

export default App;
