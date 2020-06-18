import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  Cards,
  CreateCardTypes,
  CardPayloadObject,
} from '../../../../store/cards/types'
import { RootState } from '../../../../store'
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  Button,
  Collapse,
  TextField,
  ButtonGroup,
} from '@material-ui/core'
import {
  remapListIdCards,
  remapBoardIdCards,
  getTrelloToken,
} from '../../../../helpers'
import TodoCard from '../../../helpers/SimpleCard/TodoCard'
import AllDone from '../../../helpers/AllDone/AllDone'
import { Divider } from '@material-ui/core'
import { IBoard } from '../../../../store/boards/types'
import Alert from '@material-ui/lab/Alert'
import { ThunkDispatch } from 'redux-thunk'
import { addACard } from '../../../../store/cards/actions'
import { List } from '../../../../store/lists/types'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import './style.scss'

interface IProps {
  cards: Cards
  googleMail: string
  doesBoardExist: boolean
  myLists: List[]
  addACard?: (token: string, list: string, card: CardPayloadObject) => void
}

const PersonalTasks: FC<IProps> = ({
  cards,
  googleMail,
  doesBoardExist,
  addACard,
  myLists,
}) => {
  const [selectedList, setSelectedList] = useState('')
  const [toggleForm, setToggleForm] = useState(false)
  const [selectEmpty, setSelectEmpty] = useState(false)

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const selectChanged = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedList(event.target.value as string)
  }

  const buttonPressed = () => {
    setSelectEmpty(false)
    if (selectedList === '') {
      setSelectEmpty(true)
      return null
    }
    addACard && addACard(getTrelloToken(), selectedList, { name, desc })
    emptyState()
  }

  const emptyState = () => {
    setSelectedList('')
    setName('')
    setDesc('')
  }

  if (cards.error) {
    return (
      <div className="personal-tasks">
        <Typography className="personal-tasks__heading">
          Error: {cards.error.message}
        </Typography>
      </div>
    )
  }

  if (!doesBoardExist) {
    return (
      <div className="p-3">
        <Alert severity="error">
          <Typography variant="body2" className="text-center uppercase">
            Board-a žal ne najdem. Prosim, preverite, če je v Trellu narejen
            Board z imenom {googleMail}.
          </Typography>
        </Alert>
      </div>
    )
  }

  if (myLists.length === 0) {
    return (
      <div className="p-3">
        <Alert severity="error">
          <Typography variant="body2" className="text-center uppercase">
            Board je narejen, vendar ne najdem nobenega lista in posledično
            nobenih kartic. Prosim, naredite list.
          </Typography>
        </Alert>
      </div>
    )
  }

  return (
    <div className="personal-tasks">
      <div>
        <Typography variant="h5" className="text-center mb-3 uppercase">
          Moje zadolžitve
        </Typography>
        <Typography variant="body2" className="text-center mb-3 uppercase">
          {googleMail}
        </Typography>
      </div>
      {/* buttonPressed('5ee90051632da66cd61bba60', { name: 'WDSAWAdawda' }) */}
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setToggleForm((prevState) => !prevState)}
        >
          {toggleForm ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          &nbsp; Dodaj zadolžitev
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
          <FormControl error={selectEmpty} fullWidth>
            <InputLabel id="demo-simple-select-label">Izberi</InputLabel>
            <Select
              required
              value={selectedList}
              onChange={selectChanged}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {myLists.map((list: List) => (
                <MenuItem value={list.id}>{list.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Kam dodati kartico</FormHelperText>
          </FormControl>
          <ButtonGroup className="simplecard-modal-form-btns">
            <Button color="primary" onClick={buttonPressed} variant="contained">
              Shrani
            </Button>
            <Button onClick={() => setToggleForm(false)}>Zapri</Button>
          </ButtonGroup>
        </div>
      </Collapse>
      <Divider style={{ marginBottom: '1rem' }} />
      <div>
        {cards.cards.length > 0 ? (
          cards.cards.map((card: Card) => (
            <TodoCard className="mb-3" key={card.id} card={card} />
          ))
        ) : (
          <AllDone />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  let mappedCards = remapListIdCards(
    store.lists.lists,
    remapBoardIdCards(store.boards.boards, store.cards.cards),
  )

  // Does board even exist
  const doesBoardExist =
    store.boards.boards.filter(
      (board: IBoard) => board.name === store.googleUser.email,
    ).length > 0

  // Get out current user
  mappedCards = mappedCards.filter(
    (card: Card) =>
      card.idBoard === store.googleUser.email &&
      !card.dueComplete &&
      !card.closed,
  )

  const myLists = store.lists.lists.filter(
    (list: List) => list.idBoard === store.googleUser.email,
  )

  return {
    cards: {
      ...store.cards,
      cards: mappedCards,
    },
    googleMail: store.googleUser.email,
    doesBoardExist,
    myLists,
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalTasks)
