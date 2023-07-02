//import logo from './logo.svg';
import './App.css';

function changeHandler(){
  ;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <p>
        < input type="file" name="file" onChange={changeHandler} multiple/>
      </p>
    </div>
  );
}

export default App;
