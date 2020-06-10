import { ReactComponent as LoadingSvg } from './loading.svg'

import React from 'react'
import './style.scss'

export const Loading = () => {
  return (
    <div className="loading">
      <LoadingSvg />
    </div>
  )
}
