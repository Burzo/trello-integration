import React from 'react'
import { Route, Switch, Link, useHistory } from 'react-router-dom'
import useTrelloClient from './hooks/useTrelloClient'
import HomeView from './views/HomeView'
import { Loading } from './helpers/Loading/Loading'

import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { GoogleLogout } from 'react-google-login'

// Main entry point for the whole application. Everything is loaded up here.
const TrelloIntegration = () => {
  let history = useHistory()
  const [token, error, logout] = useTrelloClient(
    process.env.REACT_APP_TRELLO_API_KEY,
  )

  if (error) {
    return <h1>{error}</h1>
  }

  if (token) {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography style={{ marginRight: '2rem' }} variant="h5">
              DEL d.o.o.&nbsp;
            </Typography>
            <Button onClick={() => history.push('/')} color="inherit">
              Domov
            </Button>
            <Button onClick={() => history.push('/place')} color="inherit">
              Plače
            </Button>
            <span style={{ marginLeft: 'auto' }}>
              <GoogleLogout
                clientId="30269258381-dj8lnlf7ouintma2bpgo58nm97fsas00.apps.googleusercontent.com"
                onLogoutSuccess={() => window.location.reload()}
              >
                Logout
              </GoogleLogout>
            </span>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" component={() => <HomeView token={token} />} />
          <Route
            exact
            path="/place"
            component={() => <h1>In the making...</h1>}
          />
          <Route component={() => <HomeView token={token} />} />
        </Switch>
      </React.Fragment>
    )
  }

  return (
    <div className="container-fluid fixed-middle">
      <Loading />
    </div>
  )
}

export default TrelloIntegration
