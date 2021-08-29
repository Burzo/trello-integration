import React, { FunctionComponent } from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { IconButton, Divider, SwipeableDrawer } from '@material-ui/core'

interface IProps {
  onClick: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  side?: 'left' | 'right'
  width: number
}

export const MyDrawer: FunctionComponent<IProps> = ({
  onClick,
  side = 'left',
  width,
  children,
  open,
}) => {
  return (
    <SwipeableDrawer
      style={{ width }}
      PaperProps={{ style: { width } }}
      anchor={side}
      open={open}
      onClose={() => onClick(false)}
      onOpen={() => onClick(true)}
    >
      <div className={side === 'left' ? 'left' : ''}>
        <IconButton onClick={() => onClick(false)}>
          {side === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider style={{ marginBottom: '1rem' }} />
      {children}
    </SwipeableDrawer>
  )
}
