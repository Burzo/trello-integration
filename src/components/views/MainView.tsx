import React, { useEffect, FC, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../store'
import { AllBoardsTypes, IBoard, IBoards } from '../../store/boards/types'
import { fetchBoards } from '../../store/boards/actions'
import {
  fetchCardsForMultipleBoards,
  updateCard,
} from '../../store/cards/actions'
import {
  Card,
  Cards,
  UpdateCardTypes,
  CardPayloadObject,
} from '../../store/cards/types'
import {
  remapBoardIdCards,
  remapBoardIdLists,
  remapListIdCards,
} from '../../helpers'
import { fetchListsForMultipleBoards } from '../../store/lists/actions'
import './style.scss'
import { Header } from '../helpers/Header/Header'
import Router from '../helpers/Router/Router'

interface IProps {
  token: string
  boards: IBoards
  cards: Cards
  fetchBoards: (token: string) => void
  fetchCardsForMultipleBoards: (token: string, boards: IBoard[]) => void
  fetchListsForMultipleBoards: (token: string, boards: IBoard[]) => void
  updateCard: (token: string, card: Card, query: CardPayloadObject) => void
}

const FETCH_INTERVAL = 20000
const BOARD_FETCH_INTERVAL = 100000

const MainView: FC<IProps> = ({
  boards,
  token,
  fetchBoards,
  fetchCardsForMultipleBoards,
  fetchListsForMultipleBoards,
  updateCard,
}) => {
  const [loaded, setLoaded] = useState(false)

  let refreshInterval: any = useRef()
  let boardFetchingInterval: any = useRef()

  useEffect(() => {
    fetchBoards(token)
    if (boardFetchingInterval.current) {
      clearInterval(boardFetchingInterval.current)
    }
    boardFetchingInterval.current = setInterval(() => {
      fetchBoards(token)
    }, BOARD_FETCH_INTERVAL)

    return () => {
      clearInterval(boardFetchingInterval.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (boards.boards.length > 0 && !loaded) {
      refreshEverything()
      setLoaded(true)
      if (refreshInterval.current) {
        clearInterval(refreshInterval.current)
      }
      refreshInterval.current = setInterval(() => {
        refreshEverything()
      }, FETCH_INTERVAL)
    }

    return () => {
      clearInterval(refreshInterval.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards.boards.length])

  const refreshEverything = () => {
    fetchCardsForMultipleBoards(token, boards.boards)
    fetchListsForMultipleBoards(token, boards.boards)
  }

  return (
    <Header>
      {(className) => {
        return (
          <div className={className}>
            <Router />
          </div>
        )
      }}
    </Header>
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
  dispatch: ThunkDispatch<RootState, any, AllBoardsTypes | UpdateCardTypes>,
) => {
  return {
    fetchBoards: (token: string) => dispatch(fetchBoards(token)),
    fetchCardsForMultipleBoards: (token: string, boards: IBoard[]) =>
      dispatch(fetchCardsForMultipleBoards(token, boards)),
    fetchListsForMultipleBoards: (token: string, boards: IBoard[]) => {
      dispatch(fetchListsForMultipleBoards(token, boards))
    },
    updateCard: (token: string, card: Card, query: CardPayloadObject) =>
      dispatch(updateCard(token, card, query)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
