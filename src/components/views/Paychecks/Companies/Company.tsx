import React from 'react'
import { Typography } from '@material-ui/core'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'

interface IProps {
  company: string
}

export default function Company({ company }: IProps) {
  return (
    <div className="text-center">
      <AssignmentTurnedInIcon className="done-icon" />
      <Typography>{company}</Typography>
    </div>
  )
}
