import { createRoot } from 'react-dom/client'
import './App.css'
import {App} from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CarContextProvider, { CarContext } from './context/CarContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <CarContextProvider>
        <App />
      </CarContextProvider> 
  </BrowserRouter>,
)
