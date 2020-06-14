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
import {
  Modal,
  Fade,
  Backdrop,
  Button,
  Paper,
  Snackbar,
  Card,
  ButtonGroup,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Divider,
} from '@material-ui/core'
import { SimpleCardModal } from './SimpleCardModal'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
        <Card
          key={card.id}
          elevation={3}
          className={'simplecard card text-dark ' + className}
        >
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="container">
                <Typography variant="h6">{card.idBoard}</Typography>
                <Typography className="subtitle">{card.name}</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
              <Divider style={{ marginBottom: '1rem' }} />
              <div style={card.desc !== '' ? { marginBottom: '1rem' } : {}}>
                {card.desc}
              </div>
              <div className="center">
                <ButtonGroup className="simplecard-modal-form-btns">
                  <Button variant="contained" onClick={() => setOpen(true)}>
                    Edit
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={buttonPress}
                  >
                    Done
                  </Button>
                </ButtonGroup>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Card>
      </CSSTransition>
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
