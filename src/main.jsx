import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContentShare from './Context API/ContentShare.jsx'
import TokenAuthent from './Context API/TokenAuthent.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <TokenAuthent>
       <ContentShare> 
          <BrowserRouter> 
             <App />
          </BrowserRouter>
       </ContentShare>
    </TokenAuthent>
   
  </React.StrictMode>,
)
