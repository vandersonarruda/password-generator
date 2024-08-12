import './App.scss';
import PasswordGenerator from './components/PasswordGenerator/PasswordGenerator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Password Generator</h1>
      </header>
      <main>
        <PasswordGenerator />
      </main>
    </div>
  );
}

export default App;
