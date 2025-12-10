import ReactDOM from 'react-dom/client'
import consola from 'consola/browser';
import { App } from './app'

consola.info('version', import.meta.env.VITE_VERSION)
const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)