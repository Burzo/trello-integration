import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import './style.scss'
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { GoogleLogout } from 'react-google-login'
import { MyDrawer } from '../MyDrawer/MyDrawer'
import PersonalTasks from '../../views/Home/PersonalTasks/PersonalTasks'

const DRAWER_WIDTH = 260

interface IProps {
  children: (className: string) => false | JSX.Element
}

export const Header = ({ children }: IProps) => {
  let history = useHistory()

  const [openDrawer, setOpenDrawer] = useState(false)
  const [openSecondDrawer, setOpenSecondDrawer] = useState(false)

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
          <Button onClick={() => history.push('/overview')} color="inherit">
            Pregled
          </Button>
          <Button onClick={() => history.push('/basic-info')} color="inherit">
            Osnovni podatki
          </Button>
          <Button onClick={() => history.push('/bilance')} color="inherit">
            Bilance
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
        <MyDrawer
          open={openDrawer}
          onClick={setOpenDrawer}
          side="left"
          width={DRAWER_WIDTH}
        ></MyDrawer>
        <MyDrawer
          open={openSecondDrawer}
          onClick={setOpenSecondDrawer}
          side="right"
          width={DRAWER_WIDTH}
        >
          <PersonalTasks />
        </MyDrawer>
      </AppBar>
      {children(getClassName())}
    </React.Fragment>
  )
}
