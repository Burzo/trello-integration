import {
  AllBoardsTypes,
  FETCH_ALL_DATA_START,
  FETCH_ALL_DATA_SUCCESS,
  FETCH_ALL_DATA_ERROR,
  INITIAL_LOAD,
} from './types'
import { Dispatch } from 'react'
import { AppThunk } from '..'
import {
  handleTrelloTokenExpiry,
  fetchRetry,
  gatherUpData,
  mapBoardCardList,
} from '../../helpers'
import {
  Card,
  FETCH_CARDS_ERROR,
  FETCH_CARDS_START,
  FETCH_CARDS_SUCCESS,
} from '../cards/types'
import {
  FETCH_BOARDS_ERROR,
  FETCH_BOARDS_START,
  FETCH_BOARDS_SUCCESS,
  IBoard,
} from '../boards/types'
import {
  FETCH_LISTS_ERROR,
  FETCH_LISTS_START,
  FETCH_LISTS_SUCCESS,
  List,
} from '../lists/types'

export const fetchAll =
  (token: string): AppThunk =>
  (dispatch: Dispatch<AllBoardsTypes>, state) => {
    dispatch({ type: FETCH_ALL_DATA_START })
    dispatch({ type: FETCH_BOARDS_START })

    fetchRetry(
      `https://api.trello.com/1/members/me/boards/?fields=name&lists=all&list_fields=name&key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${token}`,
    )
      .then((res: Response) => handleTrelloTokenExpiry(res))
      .then((companies: IBoard[]) => {
        let allCards: Card[] = []
        let url = ''
        const batchedUrls: string[] = []

        companies.map((board: IBoard, index: number) => {
          if (index % 5 === 0 || companies.length === index + 1) {
            url += `/boards/${board.id}/cards`
            batchedUrls.push(url)
            url = ''
          } else {
            url += `/boards/${board.id}/cards,`
          }
          return board
        })

        dispatch({ type: FETCH_BOARDS_SUCCESS, payload: companies })
        dispatch({ type: FETCH_LISTS_START })
        dispatch({ type: FETCH_CARDS_START })

        Promise.all(
          batchedUrls.map((str: string) => {
            return fetchRetry(
              `https://api.trello.com/1/batch?urls=${str}&key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${token}`,
            )
              .then((res: Response) => handleTrelloTokenExpiry(res))
              .then((data) => {
                data = gatherUpData(data)
                allCards = [...allCards, ...(data as Card[])]
                return null
              })
          }),
        ).then(() => {
          console.log('All data loaded successfully. Filtering stuff now.')
          dispatch({
            type: FETCH_ALL_DATA_SUCCESS,
            payload: mapBoardCardList(companies, allCards),
          })
          dispatch({ type: FETCH_CARDS_SUCCESS, payload: allCards })

          const allLists = companies.reduce<List[]>(
            (acc, value) => [
              ...acc,
              ...value.lists.map((list) => ({ ...list, idBoard: value.name })),
            ],
            [],
          )

          dispatch({ type: FETCH_LISTS_SUCCESS, payload: allLists })
        })
      })
      .catch((e: Error) => {
        dispatch({ type: FETCH_ALL_DATA_ERROR, payload: e })
        dispatch({ type: FETCH_LISTS_ERROR, payload: e })
        dispatch({ type: FETCH_CARDS_ERROR, payload: e })
        dispatch({ type: FETCH_BOARDS_ERROR, payload: e })
        if (!state().allData.initialLoad) {
          dispatch({ type: INITIAL_LOAD })
        }
      })
  }
