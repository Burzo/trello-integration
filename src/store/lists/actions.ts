import {
  AllListsTypes,
  FETCH_LISTS_START,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_ERROR,
  List,
} from './types'
import { Dispatch } from 'react'
import { AppThunk } from '..'
import { IBoard } from '../boards/types'
import { handleTrelloTokenExpiry, manageLists } from '../../helpers'

export const fetchListsForMultipleBoards = (
  token: string,
  boards: IBoard[],
): AppThunk => (dispatch: Dispatch<AllListsTypes>, state) => {
  dispatch({ type: FETCH_LISTS_START })

  let allLists: List[] = []

  Promise.all(
    boards.map((board: IBoard) => {
      return fetch(
        `https://api.trello.com/1/boards/${board.id}/lists?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${token}`,
      )
        .then((res: Response) => handleTrelloTokenExpiry(res))
        .then((data) => {
          allLists = [...allLists, ...data]
          return null
        })
        .catch((e: Error) => {
          dispatch({ type: FETCH_LISTS_ERROR, payload: e })
          return null
        })
    }),
  )
    .then(() => {
      console.log('Lists loaded successfully.')
      allLists = manageLists(state().lists.lists, allLists)
      dispatch({ type: FETCH_LISTS_SUCCESS, payload: allLists })
    })
    .catch((error) => console.log(error))
}
