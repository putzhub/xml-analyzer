//import logo from './logo.svg';
import './App.css';

function changeHandler(props){
  ;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>XML Analyzer</h1>
      </header>
      <p>
        < input type="file" name="file" onChange={changeHandler} multiple/>
      </p>
    </div>
  );
}

export default App;
