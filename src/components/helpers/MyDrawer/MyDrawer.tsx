import React from 'react'
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
} from '@material-ui/core'

interface IProps {
  onClick: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  side?: 'left' | 'right'
  width: number
}

export default function MyDrawer({
  onClick,
  side = 'left',
  width,
  open,
}: IProps) {
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
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={'Plače'} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
