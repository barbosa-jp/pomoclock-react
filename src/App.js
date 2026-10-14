import PlayIcon from './assets/images/icon-play.svg';
import ColonImage from './assets/images/colon-image.svg';
import MusicIcon from './assets/images/icon-music.svg';
import SettingIcon from './assets/images/icon-settings.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Pomoclock</h1>
      </header>
      <main className="main">
        <ul className="options-timer">
          <li><button className='selected' type='button'>Pomodoro</button></li>
          <li><button type='button'>Short Break</button></li>
          <li><button type='button'>Long Break</button></li>
        </ul>
        <div className='timer'>
          <div className='numbers'>
            <p className='hour'>15</p>
            <img className='colon' src={ColonImage}/>
            <p className='minute'>00</p>
          </div>
          <svg className='circle' width='100%' height='100%'>
            <circle className='circular-progress' cx='50%' cy='50%' r='46%'/>
            <circle className='background' cx='50%' cy='50%' r='46%'/>
          </svg>
        </div>
        <button className='button-start' type='button'>
          <img className='icon' src={PlayIcon}/>
          START
        </button>
      </main>
      <footer class="footer">
        <ul className='options'>
          <li><button><img className='icon' src={SettingIcon} /></button></li>
          <li><button><img className='icon' src={MusicIcon} /></button></li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
