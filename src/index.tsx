import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from './store/index'
import 'fontsource-roboto'
import { BrowserRouter } from 'react-router-dom'
import { StylesProvider } from '@material-ui/core/styles'
import 'bootstrap/dist/css/bootstrap.min.css'

const store = configureStore()

store.subscribe(() => {
  console.log(store.getState())
})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <StylesProvider injectFirst>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </StylesProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
)
