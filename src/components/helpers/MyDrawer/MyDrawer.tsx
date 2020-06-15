import React, { FC, FunctionComponent } from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import {
  IconButton,
  Drawer,
  ListItemText,
  List,
  Divider,
  ListItem,
  ListItemTypeMap,
} from '@material-ui/core'

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
