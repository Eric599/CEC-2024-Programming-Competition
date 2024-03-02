import './App.css';

import { createTheme } from '@mui/material/styles';
import Dashboard from './components/Dashboard'

function App() {
  const defaultTheme = createTheme();

  return (
    <div className="App">
      <header className="App-header">
        <Dashboard title='Rig Path Analysis Dashboard' theme={defaultTheme}/>
      </header>
    </div>
  );
}

export default App;
