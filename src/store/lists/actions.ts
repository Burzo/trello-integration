import {
  AllListsTypes,
  FETCH_LISTS_START,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_ERROR,
} from './types'
import { Dispatch } from 'react'
import { AppThunk } from '..'
import { IBoard } from '../boards/types'
import { handleTrelloTokenExpiry } from '../../helpers'

export const fetchListsForMultipleBoards = (
  token: string,
  boards: IBoard[],
): AppThunk => (dispatch: Dispatch<AllListsTypes>) => {
  dispatch({ type: FETCH_LISTS_START })

  Promise.all(
    boards.map((board: IBoard) => {
      return fetch(
        `https://api.trello.com/1/boards/${board.id}/lists?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${token}`,
      )
        .then((res: Response) => handleTrelloTokenExpiry(res))
        .then((data) => {
          dispatch({ type: FETCH_LISTS_SUCCESS, payload: data })
          return null
        })
        .catch((e: Error) => {
          dispatch({ type: FETCH_LISTS_ERROR, payload: e })
          return null
        })
    }),
  )
    .then(() => console.log('Lists loaded successfully.'))
    .catch((error) => console.log(error))
}
