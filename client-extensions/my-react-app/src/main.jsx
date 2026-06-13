import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const renderApp = (container) =>
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )

class MyReactApp extends HTMLElement {
  connectedCallback() {
    if (this.root) {
      return
    }

    this.root = document.createElement('div')
    this.root.id = 'root'
    this.appendChild(this.root)
    renderApp(this.root)
  }
}

if (!customElements.get('my-react-app')) {
  customElements.define('my-react-app', MyReactApp)
}

const root = document.getElementById('root')

if (root) {
  renderApp(root)
}
