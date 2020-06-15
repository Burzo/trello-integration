import React from 'react'
import HomeView from '../../views/HomeView'
import { Route, Switch } from 'react-router-dom'
import { getTrelloToken } from '../../../helpers'

// Wrapped in use memo so that it doesn't rerender everytime side drawer is opened
const Router = () => {
  const token = getTrelloToken()
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <HomeView token={token} />} />
        <Route
          exact
          path="/place"
          component={() => <h1>In the making...</h1>}
        />
        <Route component={() => <HomeView token={token} />} />
      </Switch>
    </div>
  )
}

export default React.memo(Router)
