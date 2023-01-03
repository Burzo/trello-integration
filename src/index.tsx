// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as serviceWorker from './serviceWorker'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from './store/index'
import 'fontsource-roboto'
import { BrowserRouter } from 'react-router-dom'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import {
  StylesProvider,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

let theme = createTheme({
  palette: {
    primary: {
      main: '#003f64',
    },
  },
})
theme = responsiveFontSizes(theme)

const store = configureStore()

// store.subscribe(() => {
//   console.log(store.getState())
// })

ReactDOM.render(
  <GoogleOAuthProvider clientId="30269258381-dj8lnlf7ouintma2bpgo58nm97fsas00.apps.googleusercontent.com">
    {/* <GoogleOAuthProvider clientId="791694631450-rkpf09upmj6l6epo6uovc84jlgmcjqs9.apps.googleusercontent.com"> */}
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </MuiPickersUtilsProvider>
          </StylesProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>,
  document.getElementById('root'),
)

serviceWorker.register()
