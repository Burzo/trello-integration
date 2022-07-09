import React from 'react'
import TrelloIntegration from './components/'
import { getBrowserLocales } from './helpers'
import moment from 'moment-timezone'
import 'moment/locale/sl'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from './store'
import { setGoogleUser, GoogleUser } from './store/google/types'
import { putGoogleUser } from './store/google/actions'
import { AbsoluteVoucher } from './components/views/Voucher/AbsoluteVoucher'

// Set language locale
let locale = getBrowserLocales({ languageCodeOnly: true })
locale && moment.locale(locale[0])

function App() {
  // if (PRODUCTION && !loggedIn) {
  //   return (
  //     <div className="container-fluid">
  //       <span className="fixed-middle d-flex flex-column justify-content-center text-center">
  //         <h2 className="mb-3">Trello API integration</h2>
  //         <div className="mb-3">
  //           <GoogleLogin
  //             clientId="30269258381-dj8lnlf7ouintma2bpgo58nm97fsas00.apps.googleusercontent.com"
  //             onSuccess={responseGoogle}
  //             onFailure={responseGoogle}
  //             onRequest={startLoadingGoogle}
  //             isSignedIn={true}
  //             cookiePolicy={'single_host_origin'}
  //           />
  //         </div>
  //         <div>
  //           <Typography align="center" variant="body2">
  //             {error}
  //           </Typography>
  //         </div>
  //       </span>
  //     </div>
  //   )
  // }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <TrelloIntegration />
      <AbsoluteVoucher />
    </div>
  )
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, any, setGoogleUser>,
) => {
  return {
    putGoogleUser: (user: GoogleUser) => dispatch(putGoogleUser(user)),
  }
}

export default connect(() => ({}), mapDispatchToProps)(App)
