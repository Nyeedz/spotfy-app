import store from '@redux/store'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './global'

const root = createRoot(document.querySelector('#root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
