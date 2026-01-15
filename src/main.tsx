import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import {store} from './app/store.ts';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster position="top-right" richColors />
      <App />
    </Provider>
  </BrowserRouter>,
)
