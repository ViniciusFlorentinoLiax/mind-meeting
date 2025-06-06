import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { Home } from './pages/home/Home.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <App>
      <Home/>
    </App>
  </>,
)
