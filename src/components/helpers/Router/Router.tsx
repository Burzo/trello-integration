import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from '../../views/Home'
import Paychecks from '../../views/Paychecks'
import Overview from '../../views/Overview'
import CompanyInfo from '../../views/CompanyInfo'
import Bilance from '../../views/Bilance'
import Tasks from '../../views/Tasks'
import { Voucher } from '../../views/Voucher'
import { AbsoluteVoucher } from '../../views/Voucher/AbsoluteVoucher'

// Wrapped in use memo so that it doesn't rerender everytime side drawer is opened
const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Tasks} />
        <Route exact path="/obrazci" component={Home} />
        <Route exact path="/place" component={Paychecks} />
        <Route exact path="/overview" component={Overview} />
        <Route exact path="/basic-info" component={CompanyInfo} />
        <Route exact path="/bilance" component={Bilance} />
        <Route
          exact
          path="/vavcer-za-digitalni-marketing"
          component={Voucher}
        />
        <Route component={Home} />
      </Switch>
    </div>
  )
}

export default React.memo(Router)
