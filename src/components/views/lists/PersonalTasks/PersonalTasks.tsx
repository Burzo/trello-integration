import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Card, Cards } from '../../../../store/cards/types'
import { RootState } from '../../../../store'
import { Typography } from '@material-ui/core'
import { remapListIdCards, remapBoardIdCards } from '../../../../helpers'
import TodoCard from '../../../helpers/SimpleCard/TodoCard'
import AllDone from '../../../helpers/AllDone/AllDone'
import { Divider } from '@material-ui/core'
import { IBoard } from '../../../../store/boards/types'
import Alert from '@material-ui/lab/Alert'

interface IProps {
  cards: Cards
  googleMail: string
  doesBoardExist: boolean
}

const PersonalTasks: FC<IProps> = ({ cards, googleMail, doesBoardExist }) => {
  if (cards.error) {
    return (
      <div className="ddv">
        <Typography className="ddv__heading">
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

  return (
    <div className="ddv">
      <div>
        <Typography variant="h5" className="text-center mb-3 uppercase">
          Moje zadolžitve
        </Typography>
        <Typography variant="body2" className="text-center mb-3 uppercase">
          {googleMail}
        </Typography>
      </div>
      <Divider style={{ marginBottom: '1rem' }} />
      <div>
        {cards.cards.length > 0 ? (
          cards.cards.map((card: Card) => (
            <TodoCard key={card.id} card={card} />
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

  return {
    cards: {
      ...store.cards,
      cards: mappedCards,
    },
    googleMail: store.googleUser.email,
    doesBoardExist,
  }
}

export default connect(mapStateToProps)(PersonalTasks)
