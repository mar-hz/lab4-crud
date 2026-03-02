import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Usuarios from './Usuarios.jsx'
import UsersCrud from './ai_components/UsersCrud.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Usuarios />
    <hr className="my-4" />
    <UsersCrud />
  </StrictMode>,
)
