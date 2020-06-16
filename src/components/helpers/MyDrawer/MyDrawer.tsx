import React, { FunctionComponent } from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { IconButton, Drawer, Divider } from '@material-ui/core'

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
    <Drawer
      style={{ width }}
      PaperProps={{ style: { width } }}
      variant="persistent"
      anchor={side}
      open={open}
    >
      <div className={side === 'left' ? 'left' : ''}>
        <IconButton onClick={() => onClick(false)}>
          {side === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider style={{ marginBottom: '1rem' }} />
      {children}
    </Drawer>
  )
}
