import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document?.getElementById('ui-root') as HTMLElement)
console.log(root)
if(!root) {
  throw new Error('Root element not found')
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

