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
  TextField,
} from '@material-ui/core'
import { SimpleCardModal } from './SimpleCardModal'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import moment from 'moment-timezone'

interface IProps {
  card: MyCard
  className?: string
  updateCard?: (token: string, card: MyCard, query: CardPayloadObject) => void
}

const CompanyCard = ({ updateCard, card, className = '' }: IProps) => {
  const [animate, setAnimate] = useState(false)
  const [open, setOpen] = useState(false)

  const buttonPress = () => {
    if (card.dueComplete) {
      updateCard &&
        updateCard(getTrelloToken(), card, {
          dueComplete: false,
          due: '',
        })
    } else {
      updateCard &&
        updateCard(getTrelloToken(), card, {
          dueComplete: true,
          due: moment.utc().toString(),
        })
    }
  }

  useEffect(() => {
    setAnimate(true)
  }, [])

  let date = card.due
    ? new Date(card.due).toLocaleDateString()
    : 'No date available'

  const isCompleted = card.dueComplete ? 'success' : ''

  // TODO remove the on hover show icon logic and add a button group or icons next to cards
  return (
    <div>
      <CSSTransition
        in={animate}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <Card key={card.id} className={'companycard  ' + className}>
          <ExpansionPanel className={isCompleted}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon className={isCompleted} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="container">
                <Typography align="center">{card.name}</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
              <TextField
                fullWidth
                multiline
                InputProps={{
                  disableUnderline: !open,
                  classes: { multiline: isCompleted },
                }}
                inputProps={{
                  readOnly: !open,
                  disabled: !open,
                }}
                value={card.desc}
              />
              <Divider style={{ marginBottom: '1rem' }} />
              <div>
                <Typography>Do: {date}</Typography>
              </div>
              <Link href={card.url} target="_blank" rel="noreferrer">
                <Typography>Odpri v Trellu</Typography>
              </Link>
              <div className="center">
                <ButtonGroup className="companycard-modal-form-btns">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={buttonPress}
                    size="small"
                  >
                    {isCompleted ? 'Ni narejeno' : 'Narejeno'}
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
        aria-labelledby="companycard-modal-title"
        aria-describedby="companycard-modal-description"
        className="companycard-modal"
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

export default connect(() => ({}), mapDispatchToProps)(CompanyCard)
