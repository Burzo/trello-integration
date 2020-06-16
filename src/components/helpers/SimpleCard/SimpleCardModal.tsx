import React, { FC, useState, SetStateAction, Dispatch } from 'react'
import { Card, CardPayloadObject } from '../../../store/cards/types'
import { Fade, TextField, Button, ButtonGroup, Paper } from '@material-ui/core'
import { getTrelloToken } from '../../../helpers'

interface IProps {
  card: Card
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  updateCard?: (token: string, card: Card, query: CardPayloadObject) => void
}

// Modal needs everything passed down since it closes up and can't finish fetching
export const SimpleCardModal: FC<IProps> = ({
  card,
  setOpen,
  open,
  updateCard,
}) => {
  const [name, setName] = useState(card.name)
  const [desc, setDesc] = useState(card.desc)

  const buttonPress = () => {
    updateCard && updateCard(getTrelloToken(), card, { name, desc })
    setOpen(false)
  }

  return (
    <Fade in={open}>
      <Paper style={{ padding: '0.5rem' }}>
        <div className="simplecard-modal-form">
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            id="name"
            label="Name"
          />
          <TextField
            variant="outlined"
            fullWidth
            id="desc"
            label="Description"
            multiline
            rows={5}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <ButtonGroup className="simplecard-modal-form-btns">
            <Button color="primary" onClick={buttonPress} variant="contained">
              Shrani
            </Button>
            <Button onClick={() => setOpen(false)}>Izhod</Button>
          </ButtonGroup>
        </div>
      </Paper>
    </Fade>
  )
}

export default SimpleCardModal
