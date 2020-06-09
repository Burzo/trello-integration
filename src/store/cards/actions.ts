import {
  AllCardsTypes,
  FETCH_CARDS_START,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
} from './types'
import { Dispatch } from 'react'
import { AppThunk } from '..'

export const fetchCardsForOneBoard = (token: string): AppThunk => (
  dispatch: Dispatch<AllCardsTypes>,
) => {
  dispatch({ type: FETCH_CARDS_START })
  fetch(
    `https://api.trello.com/1/boards/5a85cc4b335e97cd5104a64b/cards?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${token}`,
  )
    .then((res: Response) => res.json())
    .then((data) => dispatch({ type: FETCH_CARDS_SUCCESS, payload: data }))
    .catch((e: Error) => dispatch({ type: FETCH_CARDS_ERROR, payload: e }))
}
