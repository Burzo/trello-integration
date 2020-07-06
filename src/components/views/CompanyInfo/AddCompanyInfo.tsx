import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import {
  FormControl,
  Button,
  Collapse,
  TextField,
  ButtonGroup,
} from '@material-ui/core'
import { ThunkDispatch } from 'redux-thunk'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import './style.scss'
import { addACard } from '../../../store/cards/actions'
import { getTrelloToken } from '../../../helpers'
import { RootState } from '../../../store'
import { CreateCardTypes, CardPayloadObject } from '../../../store/cards/types'
import { List } from '../../../store/lists/types'
import { Error } from '../../helpers/Error/Error'

interface IProps {
  addACard?: (token: string, list: string, card: CardPayloadObject) => void
  myList?: List[]
}

const AddCompanyInfo: FC<IProps> = ({ addACard, myList = [] }) => {
  const [toggleForm, setToggleForm] = useState(false)

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const buttonPressed = () => {
    addACard && addACard(getTrelloToken(), thisList.id, { name, desc })
    emptyState()
  }

  const emptyState = () => {
    setName('')
    setDesc('')
  }

  if (myList.length > 1) {
    return (
      <Error>
        It seems there is more then one List named "Osnovni podatki". Please
        check Trello and clear the differences.
      </Error>
    )
  }

  if (myList.length < 1) {
    return (
      <Error>
        No list named "Osnovni podatki" found. Please, create it and refresh the
        page.
      </Error>
    )
  }

  const thisList: List = myList[0]

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

const mapStateToProps = (store: RootState) => {
  const myList = store.lists.lists.filter(
    (list: List) =>
      list.name.toLowerCase().trim() === 'osnovni podatki' &&
      list.idBoard === store.company,
  )

  return {
    myList,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, any, CreateCardTypes>,
) => {
  return {
    addACard: (token: string, listId: string, card: CardPayloadObject) =>
      dispatch(addACard(token, listId, card)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCompanyInfo)
