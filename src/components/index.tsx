import React, { useState } from 'react'
import { Route, Switch, Link, useHistory } from 'react-router-dom'
import useTrelloClient from './hooks/useTrelloClient'
import HomeView from './views/HomeView'
import { Loading } from './helpers/Loading/Loading'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  ListItemText,
  List,
  Divider,
  ListItem,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { GoogleLogout } from 'react-google-login'
import Router from './helpers/Router/Router'
import MyDrawer from './helpers/MyDrawer/MyDrawer'

const DRAWER_WIDTH = 260

// Main entry point for the whole application. Everything is loaded up here.
const TrelloIntegration = () => {
  let history = useHistory()

  const [openDrawer, setOpenDrawer] = useState(false)
  const [openSecondDrawer, setOpenSecondDrawer] = useState(false)
  const [token, error, logout] = useTrelloClient(
    process.env.REACT_APP_TRELLO_API_KEY,
  )

  if (error) {
    return <h1>{error}</h1>
  }

  const getClassName = () => {
    if (openDrawer && openSecondDrawer) {
      return 'animate animate-left animate-right'
    }
    if (openDrawer) {
      return 'animate animate-left'
    }
    if (openSecondDrawer) {
      return 'animate animate-right'
    }
    return 'animate'
  }
  if (token) {
    return (
      <React.Fragment>
        <AppBar
          className={getClassName()}
          position="static"
          style={{ width: 'auto' }}
        >
          <Toolbar>
            {!openDrawer && (
              <IconButton
                onClick={(e) => setOpenDrawer(true)}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            )}
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
              {!openSecondDrawer && (
                <IconButton
                  onClick={(e) => setOpenSecondDrawer(true)}
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                >
                  <ChevronLeftIcon />
                  <Typography variant="body1">My Tasks</Typography>
                </IconButton>
              )}
            </span>
          </Toolbar>
        </AppBar>
        <MyDrawer
          open={openDrawer}
          onClick={setOpenDrawer}
          side="left"
          width={DRAWER_WIDTH}
        />
        <div className={getClassName()}>
          <Router />
        </div>
        <MyDrawer
          open={openSecondDrawer}
          onClick={setOpenSecondDrawer}
          side="right"
          width={DRAWER_WIDTH}
        />
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
