import {
  AllBoardsTypes,
  FETCH_BOARDS_START,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_ERROR,
} from './types'
import { Dispatch } from 'react'
import { AppThunk } from '..'

export const fetchBoards = (token: string): AppThunk => (
  dispatch: Dispatch<AllBoardsTypes>,
) => {
  dispatch({ type: FETCH_BOARDS_START })
  fetch(
    `https://api.trello.com/1/members/me/boards/?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${token}`,
  )
    .then((res: Response) => res.json())
    .then((data) => dispatch({ type: FETCH_BOARDS_SUCCESS, payload: data }))
    .catch((e: Error) => dispatch({ type: FETCH_BOARDS_ERROR, payload: e }))
}
