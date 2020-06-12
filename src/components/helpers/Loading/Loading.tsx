import { ReactComponent as LoadingSvg } from './loading.svg'

import React from 'react'
import './style.scss'

interface IProps {
  size?: string | null
}

export const Loading = ({ size }: IProps) => {
  let className = 'loading'

  if (size) {
    className += `-${size}`
  }

  return (
    <div className={className}>
      <LoadingSvg />
    </div>
  )
}
