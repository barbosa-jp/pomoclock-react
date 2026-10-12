import PlayIcon from './assets/images/icon-play.svg';
import ColonImage from './assets/images/colon-image.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
        </div>
        <button class='button-start' type='button'>
          <img class='icon' src={PlayIcon}/>
          START
        </button>
      </main>
      <footer class="footer">
        <ul></ul>
      </footer>
    </div>
  );
}

export default App;
