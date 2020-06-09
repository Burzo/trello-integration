import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { Container, Typography } from '@material-ui/core'
import './App.scss'
import TrelloIntegration from './components/'

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

  const logoutGoogle = () => {
    window.location.reload()
  }

  const startLoadingGoogle = () => {
    setLoading(true)
  }

  if (loading) {
    return (
      <Container>
        <Typography align="center" variant="h2">
          Loading ...
        </Typography>
      </Container>
    )
  }

  if (!loggedIn) {
    return (
      <Container>
        <GoogleLogin
          clientId="30269258381-dj8lnlf7ouintma2bpgo58nm97fsas00.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          onRequest={startLoadingGoogle}
          isSignedIn={true}
          cookiePolicy={'single_host_origin'}
        />
        <Typography align="center" variant="body2">
          {error}
        </Typography>
      </Container>
    )
  }

  return (
    <Container>
      <TrelloIntegration />
      <GoogleLogout
        clientId="30269258381-dj8lnlf7ouintma2bpgo58nm97fsas00.apps.googleusercontent.com"
        onLogoutSuccess={logoutGoogle}
      ></GoogleLogout>
    </Container>
  )
}

export default App
