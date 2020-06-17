import React from 'react'
import { Typography } from '@material-ui/core'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'

export default function AllDone() {
  return (
    <div className="text-center">
      <AssignmentTurnedInIcon className="done-icon" />
      <Typography>Vse narejeno.</Typography>
    </div>
  )
}
