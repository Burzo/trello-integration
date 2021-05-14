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
import { fetchAll } from '../../store/allData/actions'

interface IProps {
  token: string
  boards: IBoards
  cards: Cards
  fetchBoards: (token: string) => void
  fetchAll: (token: string) => void
  fetchCardsForMultipleBoards: (token: string, boards: IBoard[]) => void
  fetchListsForMultipleBoards: (token: string, boards: IBoard[]) => void
  updateCard: (token: string, card: Card, query: CardPayloadObject) => void
}

const FETCH_INTERVAL = 1000 * 20
const BOARD_FETCH_INTERVAL = 1000 * 60

const MainView: FC<IProps> = ({
  boards,
  token,
  fetchBoards,
  fetchCardsForMultipleBoards,
  fetchListsForMultipleBoards,
  fetchAll,
  updateCard,
}) => {
  const [loaded, setLoaded] = useState(false)

  let refreshInterval: React.MutableRefObject<number | null | undefined> =
    useRef()
  let boardFetchingInterval: React.MutableRefObject<number | null | undefined> =
    useRef()

  /* 
      New code is fetchAll(token), before I used fetchBoard(token)
      which activated the bellow useEffect and triggered list and card
      boardFetchingInterval. Now fetchAll does everything.
    */
  useEffect(() => {
    fetchBoards(token)
    if (boardFetchingInterval.current !== null) {
      clearInterval(boardFetchingInterval.current)
    }
    boardFetchingInterval.current = window.setInterval(() => {
      fetchBoards(token)
    }, BOARD_FETCH_INTERVAL)

    return () => {
      clearInterval(boardFetchingInterval.current as number)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (boards.boards.length > 0 && !loaded) {
      refreshEverything()
      setLoaded(true)
      if (refreshInterval.current !== null) {
        clearInterval(refreshInterval.current)
      }
      refreshInterval.current = window.setInterval(() => {
        refreshEverything()
      }, FETCH_INTERVAL)
    }

    return () => {
      clearInterval(refreshInterval.current as number)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards.boards.length])

  /*
    I am now using fetchAll above to get all the information instead of the
    bellow 2 calls. All redux actions are still performed the same,
    they are just called in fetchAll now. It's hackish, but who has
    the time. Should probably totally refactor sooner or later and
    create one simple reducer with all the needed data so that there's
    not too much calculation.
  */
  const refreshEverything = () => {
    // fetchCardsForMultipleBoards(token, boards.boards)
    // fetchListsForMultipleBoards(token, boards.boards)
    fetchAll(token)
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
      cards: filteredOutdatedCards,
    },
    lists: store.lists,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, any, AllBoardsTypes | UpdateCardTypes>,
) => {
  return {
    fetchBoards: (token: string) => dispatch(fetchBoards(token)),
    fetchAll: (token: string) => dispatch(fetchAll(token)),
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
