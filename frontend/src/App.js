import './App.css';

import { createTheme } from '@mui/material/styles';
import Dashboard from './components/Dashboard'

function App() {
  const defaultTheme = createTheme();

  return (
    <div className="App">
      <header className="App-header">
        <Dashboard title='OceanNext Consulting Dashboard' theme={defaultTheme}/>
      </header>
    </div>
  );
}

export default App;