import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Routes';
import './App.css';
import { Toaster } from 'react-hot-toast';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../service-worker.ts')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}



function App() {
  return (
  <BrowserRouter>
      <Toaster />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
