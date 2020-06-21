import React from 'react'
import './style.scss'
import { Alert, AlertTitle } from '@material-ui/lab'

interface IProps {
  size?: string | null
  children: string | JSX.Element
}

export const Error = ({ size, children }: IProps) => {
  let className = 'error'

  if (size) {
    className += `-${size}`
  }

  return (
    <div className={className}>
      <Alert severity="error">
        <AlertTitle>Error occured:</AlertTitle>
        {children}
      </Alert>
    </div>
  )
}
