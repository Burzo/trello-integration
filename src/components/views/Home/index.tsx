import React from 'react'
import { Grid } from '@material-ui/core'
import DDV from './DDV/DDV'
import REK from './REK/REK'
import DDVMissed from './DDVMissed/DDVMissed'
import REKMissed from './REKMissed/REKMissed'

export const Home = () => {
  return (
    <div className="home">
      <Grid className="layout" container spacing={3}>
        <Grid className="layout-columns" item xs={3}>
          <DDV />
        </Grid>
        <Grid className="layout-columns" item xs={3}>
          <REK />
        </Grid>
        <Grid className="layout-columns" item xs={3}>
          <DDVMissed />
        </Grid>
        <Grid className="layout-columns" item xs={3}>
          <REKMissed />
        </Grid>
      </Grid>
    </div>
  )
}
