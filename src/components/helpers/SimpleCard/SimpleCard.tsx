import React, { useState, useEffect } from 'react'
import { Card as MyCard, UpdateCardTypes } from '../../../store/cards/types'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../store'
import { updateCard } from '../../../store/cards/actions'
import { connect } from 'react-redux'
import { getTrelloToken } from '../../../helpers'
import './style.scss'
import DoneIcon from '@material-ui/icons/Done'
import { CSSTransition } from 'react-transition-group'
import { Modal, Fade, Backdrop, Button, Paper } from '@material-ui/core'
import { SimpleCardModal } from './SimpleCardModal'

interface IProps {
  card: MyCard
  className?: string
  updateCard?: (token: string, card: MyCard, query: string) => void
}

const SimpleCard = ({ updateCard, card, className = '' }: IProps) => {
  const [animate, setAnimate] = useState(false)
  const [open, setOpen] = useState(false)

  const buttonPress = () => {
    updateCard && updateCard(getTrelloToken(), card, 'dueComplete=true')
    setAnimate(false)
  }

  useEffect(() => {
    setAnimate(true)
  }, [])

  let date = card.due
    ? new Date(card.due).toLocaleDateString()
    : 'No date available'

  // TODO remove the on hover show icon logic and add a button group or icons next to cards
  return (
    <div>
      <CSSTransition
        in={animate}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <Paper elevation={3}>
          <div className="simplecard" key={card.id}>
            <div className={'card text-dark bg-light mb-3 ' + className}>
              <div className="card-header">{card.idBoard}</div>
              <div className="card-body">
                <p className="card-title">{card.name}</p>
                <p className="card-text">{card.desc}</p>
                <p className="card-text">Expires: {date}</p>
              </div>
            </div>
            <DoneIcon onClick={buttonPress} className="simplecard__icon" />
          </div>
        </Paper>
      </CSSTransition>
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <Modal
        aria-labelledby="simplecard-modal-title"
        aria-describedby="simplecard-modal-description"
        className="simplecard-modal"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <SimpleCardModal
          updateCard={updateCard}
          card={card}
          open={open}
          setOpen={setOpen}
        />
      </Modal>
    </div>
  )
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, any, UpdateCardTypes>,
) => {
  return {
    updateCard: (token: string, card: MyCard, query: string) =>
      dispatch(updateCard(token, card, query)),
  }
}

export default connect(null, mapDispatchToProps)(SimpleCard)
