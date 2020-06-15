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

const DRAWER_WIDTH = 220

// Main entry point for the whole application. Everything is loaded up here.
const TrelloIntegration = () => {
  let history = useHistory()

  const [openDrawer, setOpenDrawer] = useState(false)
  const [token, error, logout] = useTrelloClient(
    process.env.REACT_APP_TRELLO_API_KEY,
  )

  if (error) {
    return <h1>{error}</h1>
  }

  if (token) {
    return (
      <React.Fragment>
        <AppBar
          className={openDrawer ? 'animate animate-left' : 'animate'}
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
            </span>
          </Toolbar>
        </AppBar>
        <Drawer
          style={{ width: DRAWER_WIDTH }}
          PaperProps={{ style: { width: DRAWER_WIDTH } }}
          variant="persistent"
          anchor="left"
          open={openDrawer}
        >
          <div>
            <IconButton onClick={() => setOpenDrawer(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={'Plače'} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <div className={openDrawer ? 'animate animate-left' : 'animate'}>
          <Router />
        </div>
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
