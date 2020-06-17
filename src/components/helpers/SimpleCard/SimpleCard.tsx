import React, { useState, useEffect } from 'react'
import {
  Card as MyCard,
  UpdateCardTypes,
  CardPayloadObject,
} from '../../../store/cards/types'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../store'
import { updateCard } from '../../../store/cards/actions'
import { connect } from 'react-redux'
import { getTrelloToken } from '../../../helpers'
import './style.scss'
import { CSSTransition } from 'react-transition-group'
import {
  Modal,
  Backdrop,
  Button,
  Card,
  ButtonGroup,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Divider,
  Link,
} from '@material-ui/core'
import { SimpleCardModal } from './SimpleCardModal'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import moment from 'moment-timezone'
import ErrorIcon from '@material-ui/icons/Error'

interface IProps {
  card: MyCard
  className?: string
  updateCard?: (token: string, card: MyCard, query: CardPayloadObject) => void
}

const SimpleCard = ({ updateCard, card, className = '' }: IProps) => {
  const [animate, setAnimate] = useState(false)
  const [open, setOpen] = useState(false)

  const buttonPress = () => {
    updateCard &&
      updateCard(getTrelloToken(), card, {
        dueComplete: true,
        due: moment.utc().toString(),
      })
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
        <Card key={card.id} elevation={3} className="simplecard">
          <ExpansionPanel classes={{ root: 'simplecard-height' }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              classes={{
                root: 'h-100',
                expandIcon: 'simplecard-expansion-panel-icon',
              }}
            >
              {className === 'danger' && (
                <div className={'center ' + className}>
                  <ErrorIcon fontSize="large" />
                </div>
              )}
              <div className="container">
                <Typography
                  variant="body1"
                  className={
                    className === 'danger' ? '' : 'simplecard-small-text-1'
                  }
                >
                  {card.idBoard}
                </Typography>
                <Typography
                  variant="body2"
                  className={
                    className === 'danger' ? '' : 'simplecard-small-text-2'
                  }
                >
                  {card.name}
                </Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
              <Divider style={{ marginBottom: '0.7rem' }} />
              <div>
                <Typography
                  className={
                    className === 'danger' ? '' : 'simplecard-small-text-1'
                  }
                >
                  Do: {date}
                </Typography>
              </div>
              <Link href={card.url} target="_blank" rel="noreferrer">
                <Typography
                  className={
                    className === 'danger' ? '' : 'simplecard-small-text-1'
                  }
                >
                  Odpri v Trellu
                </Typography>
              </Link>
              <Divider
                style={{ marginBottom: '0.7rem', marginTop: '0.7rem' }}
              />
              <div
                className={
                  className === 'danger' ? '' : 'simplecard-small-text-1'
                }
                style={card.desc !== '' ? { marginBottom: '0.7rem' } : {}}
              >
                {card.desc}
              </div>
              <div className="center">
                <ButtonGroup className="simplecard-modal-form-btns">
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={buttonPress}
                  >
                    Narejeno
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => setOpen(true)}
                  >
                    Spremeni
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
    updateCard: (token: string, card: MyCard, query: CardPayloadObject) =>
      dispatch(updateCard(token, card, query)),
  }
}

export default connect(null, mapDispatchToProps)(SimpleCard)
