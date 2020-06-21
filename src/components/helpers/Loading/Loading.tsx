import { ReactComponent as LoadingSvg } from './loading.svg'

import React from 'react'
import './style.scss'

interface IProps {
  size?: string | null
  children?: string | JSX.Element
}

export const Loading = ({ size, children }: IProps) => {
  let className = 'loading'

  if (size) {
    className += `-${size}`
  }

  return (
    <div className={className}>
      <LoadingSvg />
      {children}
    </div>
  )
}
