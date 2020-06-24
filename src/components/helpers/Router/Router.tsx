import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from '../../views/Home'
import Paychecks from '../../views/Paychecks'
import Overview from '../../views/Overview'

// Wrapped in use memo so that it doesn't rerender everytime side drawer is opened
const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/place" component={Paychecks} />
        <Route exact path="/overview" component={Overview} />
        <Route component={Home} />
      </Switch>
    </div>
  )
}

export default React.memo(Router)
