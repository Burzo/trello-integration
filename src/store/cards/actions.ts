import {
  AllCardsTypes,
  FETCH_CARDS_START,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
  Card,
  UPDATE_CARD_START,
  UPDATE_CARD_ERROR,
  UPDATE_CARD_SUCCESS,
  UpdateCardTypes,
  UpdateCard,
} from './types'
import { Dispatch } from 'react'
import { AppThunk } from '..'
import { IBoard } from '../boards/types'
import { handleTrelloTokenExpiry } from '../../helpers'

export const fetchCardsForOneBoard = (token: string): AppThunk => (
  dispatch: Dispatch<AllCardsTypes>,
) => {
  dispatch({ type: FETCH_CARDS_START })
  fetch(
    `https://api.trello.com/1/boards/5a85cc4b335e97cd5104a64b/cards?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${token}`,
  )
    .then((res: Response) => handleTrelloTokenExpiry(res))
    .then((data) => dispatch({ type: FETCH_CARDS_SUCCESS, payload: data }))
    .catch((e: Error) => dispatch({ type: FETCH_CARDS_ERROR, payload: e }))
}

export const fetchCardsForMultipleBoards = (
  token: string,
  boards: IBoard[],
): AppThunk => (dispatch: Dispatch<AllCardsTypes>) => {
  dispatch({ type: FETCH_CARDS_START })

  Promise.all(
    boards.map((board: IBoard) => {
      return fetch(
        `https://api.trello.com/1/boards/${board.id}/cards?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${token}`,
      )
        .then((res: Response) => handleTrelloTokenExpiry(res))
        .then((data) => {
          dispatch({ type: FETCH_CARDS_SUCCESS, payload: data })
          return null
        })
        .catch((e: Error) => {
          dispatch({ type: FETCH_CARDS_ERROR, payload: e })
          return null
        })
    }),
  )
    .then(() => console.log('Cards loaded successfully.'))
    .catch((error) => console.log(error))
}

export const updateCard = (
  token: string,
  card: Card,
  query: string,
): AppThunk => (dispatch: Dispatch<UpdateCardTypes>) => {
  dispatch({ type: UPDATE_CARD_START, payload: card })

  fetch(
    `https://api.trello.com/1/cards/${card.id}?${query}&key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${token}`,
    { method: 'put' },
  )
    .then((res: Response) => handleTrelloTokenExpiry(res))
    .then((data) => {
      dispatch({ type: UPDATE_CARD_SUCCESS, payload: data })
      return null
    })
    .catch((e: Error) => {
      dispatch({ type: UPDATE_CARD_ERROR, payload: e, card: card })
      return null
    })
}
