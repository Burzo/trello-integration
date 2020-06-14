import React, { FC, useState, SetStateAction, Dispatch } from 'react'
import { Card, UpdateCardTypes } from '../../../store/cards/types'
import { Fade, TextField, Button, ButtonGroup } from '@material-ui/core'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../store'
import { updateCard } from '../../../store/cards/actions'
import { connect } from 'react-redux'
import { getTrelloToken } from '../../../helpers'

interface IProps {
  card: Card
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  updateCard?: (token: string, card: Card, query: string) => void
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

  let date = card.due
    ? new Date(card.due).toLocaleDateString()
    : 'No date available'

  const buttonPress = () => {
    const query = { name, desc }
    const queryString = Object.keys(query)
      .map((key: string) => key + '=' + encodeURIComponent((query as any)[key]))
      .join('&')
    console.log(queryString)
    updateCard && updateCard(getTrelloToken(), card, queryString)
    setOpen(false)
  }

  return (
    <Fade in={open}>
      <div className="simplecard-modal" key={card.id + card.idBoard}>
        <form className="simplecard-modal-form" noValidate autoComplete="off">
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
            <Button onClick={buttonPress} variant="contained">
              Save
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </ButtonGroup>
        </form>
      </div>
    </Fade>
  )
}

export default SimpleCardModal
