import React from 'react'
import ReactDOM from 'react-dom/client'
// ==== STYLES ====
import 'src/styles/index.css'
// ==== COMPONENTS ====
import App from 'src/App'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
