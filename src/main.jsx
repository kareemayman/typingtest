import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TypingProvider from './state/TypingProvider.jsx'

createRoot(document.getElementById('root')).render(
  <TypingProvider>
    <App />
  </TypingProvider>
)
