import React from 'react'
import { Grid } from '@material-ui/core'
import SelectCompany from './Companies/SelectCompany'
import Company from './Companies/Company'

export const Paychecks = () => {
  const [company, setCompany] = React.useState('')
  return (
    <div className="home">
      <Grid className="layout" container spacing={3}>
        <Grid className="layout-columns" item xs={3}>
          <SelectCompany company={company} setCompany={setCompany} />
        </Grid>
        <Grid className="layout-columns" item xs={9}>
          <Company company={company} />
        </Grid>
      </Grid>
    </div>
  )
}
