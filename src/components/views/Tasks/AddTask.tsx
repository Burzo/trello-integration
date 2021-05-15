import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import {
  FormControl,
  Button,
  Collapse,
  TextField,
  ButtonGroup,
  InputAdornment,
} from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import EventIcon from '@material-ui/icons/Event'
import { ThunkDispatch } from 'redux-thunk'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import './style.scss'
import { addACard } from '../../../store/cards/actions'
import { getTrelloToken } from '../../../helpers'
import { RootState } from '../../../store'
import { CreateCardTypes, CardPayloadObject } from '../../../store/cards/types'
import { Moment } from 'moment'
import { Labels } from './Labels'

interface IProps {
  addACard?: (token: string, list: string, card: CardPayloadObject) => void
  idList: string
  idBoard: string
}

const AddTask: FC<IProps> = ({ addACard, idList, idBoard }) => {
  const [toggleForm, setToggleForm] = useState(false)

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [label, setLabel] = useState('')
  const [due, setDue] = useState<Moment | null | undefined>(null)

  const buttonPressed = () => {
    if (due)
      addACard &&
        addACard(getTrelloToken(), idList, {
          name,
          desc,
          due: due ? due.utc().toString() : null,
          idLabels: [label],
        })
    emptyState()
  }

  const handleDateChange = (date: Moment | null) => {
    setDue(date)
  }

  const handleLabelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLabel(event.target.value as string)
  }

  const emptyState = () => {
    setName('')
    setDesc('')
    setDue(null)
    setLabel('')
  }

  return (
    <div
      className="add-company-info"
      style={
        toggleForm
          ? { backgroundColor: 'white' }
          : { backgroundColor: 'transparent' }
      }
    >
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setToggleForm((prevState) => !prevState)}
        >
          {toggleForm ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          &nbsp; Dodaj kartico
        </Button>
      </FormControl>
      <Collapse in={toggleForm}>
        <div className="personal-form">
          <FormControl fullWidth>
            <TextField
              className="mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              id="name"
              label="Ime kartice"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              className="mb-2"
              fullWidth
              id="desc"
              label="Opis"
              multiline
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <DatePicker
              disableToolbar
              variant="inline"
              format="DD.MM.yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Izberi rok"
              value={due}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <EventIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleDateChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <Labels
              label={label}
              handleLabelChange={handleLabelChange}
              idBoard={idBoard}
            />
          </FormControl>
          <ButtonGroup className="simplecard-modal-form-btns">
            <Button color="primary" onClick={buttonPressed} variant="contained">
              Shrani
            </Button>
            <Button onClick={() => setToggleForm(false)}>Zapri</Button>
          </ButtonGroup>
        </div>
      </Collapse>
    </div>
  )
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, any, CreateCardTypes>,
) => {
  return {
    addACard: (token: string, idList: string, card: CardPayloadObject) =>
      dispatch(addACard(token, idList, card)),
  }
}

export default connect(() => ({}), mapDispatchToProps)(AddTask)
