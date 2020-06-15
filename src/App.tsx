import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { Container, Typography } from '@material-ui/core'
import TrelloIntegration from './components/'
import { Loading } from './components/helpers/Loading/Loading'
import { getBrowserLocales } from './helpers'
import moment from 'moment-timezone'
import 'moment/locale/sl'

const PRODUCTION = process.env.NODE_ENV === 'production'

// Set language locale
let locale = getBrowserLocales({ languageCodeOnly: true })
locale && moment.locale(locale[0])

/**
 * App takes care of the google login only
 */
function App() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const responseGoogle = (response: any) => {
    if (response.error) {
      setError(
        `Something went wrong, the response was: ${response.error}. Please, try again.`,
      )
    } else {
      setLoggedIn(true)
    }
    setLoading(false)
  }

  const startLoadingGoogle = () => {
    setLoading(true)
  }

  if (loading) {
    return (
      <div className="container-fluid fixed-middle">
        <Loading />
      </div>
    )
  }

  if (PRODUCTION && !loggedIn) {
    return (
      <div className="container-fluid">
        <span className="fixed-middle d-flex flex-column justify-content-center text-center">
          <h2 className="mb-3">Trello API integration</h2>
          <div className="mb-3">
            <GoogleLogin
              clientId="30269258381-dj8lnlf7ouintma2bpgo58nm97fsas00.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              onRequest={startLoadingGoogle}
              isSignedIn={true}
              cookiePolicy={'single_host_origin'}
            />
          </div>
          <div>
            <Typography align="center" variant="body2">
              {error}
            </Typography>
          </div>
        </span>
      </div>
    )
  }

  return (
    <React.Fragment>
      <TrelloIntegration />
    </React.Fragment>
  )
}

export default App
