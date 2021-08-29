import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import './style.scss'
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  LinearProgress,
  Button,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { GoogleLogout } from 'react-google-login'
import { MyDrawer } from '../MyDrawer/MyDrawer'
import PersonalTasks from '../../views/Home/PersonalTasks/PersonalTasks'
import { connect } from 'react-redux'
import { RootState } from '../../../store'

const DRAWER_WIDTH = 260

interface IProps {
  children: (className: string) => false | JSX.Element
  loading?: boolean
}

const Header = ({ children, loading }: IProps) => {
  let history = useHistory()

  const [openDrawer, setOpenDrawer] = useState(false)
  const [openSecondDrawer, setOpenSecondDrawer] = useState(false)

  const reRouteAndCloseDrawers = (path: string) => {
    setOpenDrawer(false)
    setOpenSecondDrawer(false)
    history.push(path)
  }

  const getClassName = () => {
    // If you want to animate the conent when the drawer opens, uncomment
    // if (openDrawer && openSecondDrawer) {
    //   return 'animate animate-left animate-right'
    // }
    // if (openDrawer) {
    //   return 'animate animate-left'
    // }
    // if (openSecondDrawer) {
    //   return 'animate animate-right'
    // }
    // return 'animate'
    return ''
  }

  return (
    <React.Fragment>
      <AppBar
        className={getClassName()}
        position="static"
        style={{ width: 'auto', position: 'relative' }}
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
        {loading && (
          <LinearProgress
            style={{ position: 'absolute', bottom: 0, width: '100%' }}
          />
        )}
        <MyDrawer
          open={openDrawer}
          onClick={setOpenDrawer}
          side="left"
          width={DRAWER_WIDTH}
        >
          <Button onClick={() => reRouteAndCloseDrawers('/')} color="inherit">
            Domov
          </Button>
          <Button
            onClick={() => reRouteAndCloseDrawers('/obrazci')}
            color="inherit"
          >
            Obrazci
          </Button>
          <Button
            onClick={() => reRouteAndCloseDrawers('/place')}
            color="inherit"
          >
            Plače
          </Button>
          <Button
            onClick={() => reRouteAndCloseDrawers('/overview')}
            color="inherit"
          >
            Pregled
          </Button>
          <Button
            onClick={() => reRouteAndCloseDrawers('/basic-info')}
            color="inherit"
          >
            Osnovni podatki
          </Button>
          <Button
            onClick={() => reRouteAndCloseDrawers('/bilance')}
            color="inherit"
          >
            Bilance
          </Button>
        </MyDrawer>
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

const mapStateToProps = (store: RootState) => ({
  loading: store.allData.loading,
})

export default connect(mapStateToProps, () => ({}))(Header)
