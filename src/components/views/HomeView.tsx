import React, { useEffect, FC } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../store'
import { AllBoardsTypes, IBoard, IBoards } from '../../store/boards/types'
import { fetchBoards } from '../../store/boards/actions'
import {
  fetchCardsForOneBoard,
  fetchCardsForMultipleBoards,
  updateCard,
} from '../../store/cards/actions'
import { Card, Cards } from '../../store/cards/types'
import SimpleCard from './../helpers/SimpleCard'
import {
  remapBoardIdCards,
  remapBoardIdLists,
  remapListIdCards,
} from '../../helpers'
import { fetchListsForMultipleBoards } from '../../store/lists/actions'
import { List } from '../../store/lists/types'

interface IProps {
  token: string
  boards: IBoards
  cards: Cards
  fetchBoards: (token: string) => void
  fetchCardsForMultipleBoards: (token: string, boards: IBoard[]) => void
  fetchListsForMultipleBoards: (token: string, boards: IBoard[]) => void
  updateCard: (token: string, card: Card, query: string) => void
}

const HomeView: FC<IProps> = ({
  boards,
  cards,
  token,
  fetchBoards,
  fetchCardsForMultipleBoards,
  fetchListsForMultipleBoards,
  updateCard,
}) => {
  useEffect(() => {
    fetchBoards(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (boards.boards.length > 0) {
      fetchCardsForMultipleBoards(token, boards.boards)
      fetchListsForMultipleBoards(token, boards.boards)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards.boards])

  return (
    <div>
      {cards.cards.map((card: Card) => (
        <SimpleCard
          updateCard={(query: string) => updateCard(token, card, query)}
          card={card}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  const filteredOutdatedCards = store.cards.cards.filter(
    (card: Card) => card.dueComplete === false,
  )
  return {
    boards: store.boards,
    cards: {
      ...store.cards,
      cards: remapListIdCards(
        store.lists.lists,
        remapBoardIdCards(store.boards.boards, filteredOutdatedCards),
      ),
    },
    lists: {
      ...store.lists,
      lists: remapBoardIdLists(store.boards.boards, store.lists.lists),
    },
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, any, AllBoardsTypes>,
) => {
  return {
    fetchBoards: (token: string) => dispatch(fetchBoards(token)),
    fetchCardsForMultipleBoards: (token: string, boards: IBoard[]) =>
      dispatch(fetchCardsForMultipleBoards(token, boards)),
    fetchListsForMultipleBoards: (token: string, boards: IBoard[]) => {
      dispatch(fetchListsForMultipleBoards(token, boards))
    },
    updateCard: (token: string, card: Card, query: string) =>
      dispatch(updateCard(token, card, query)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
