import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from './store/index'
import 'typeface-roboto'
import { BrowserRouter } from 'react-router-dom'

const store = configureStore()

store.subscribe(() => {
  console.log(store.getState())
})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
)
