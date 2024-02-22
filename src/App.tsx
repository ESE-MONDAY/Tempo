import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Routes';
import './App.css';
import { Toaster } from 'react-hot-toast';



function App() {
  return (
  <BrowserRouter>
      <Toaster />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
