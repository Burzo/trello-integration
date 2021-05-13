import {
  AllBoardsTypes,
  FETCH_ALL_DATA_START,
  FETCH_ALL_DATA_SUCCESS,
  FETCH_ALL_DATA_ERROR,
} from './types'
import { Dispatch } from 'react'
import { AppThunk } from '..'
import {
  handleTrelloTokenExpiry,
  fetchRetry,
  gatherUpData,
  manageCards,
  mapBoardCardList,
} from '../../helpers'
import { Card } from '../cards/types'
import { IBoard } from '../boards/types'

export const fetchAll =
  (token: string): AppThunk =>
  (dispatch: Dispatch<AllBoardsTypes>, state) => {
    dispatch({ type: FETCH_ALL_DATA_START })
    fetchRetry(
      `https://api.trello.com/1/members/me/boards/?fields=name&lists=all&list_fields=name&key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${token}`,
    )
      .then((res: Response) => handleTrelloTokenExpiry(res))
      .then((companies) => {
        let allCards: Card[] = []
        let url = ''
        const batchedUrls: string[] = []

        companies.map((board: IBoard, index: number) => {
          if (index % 10 === 0 || companies.length === index + 1) {
            url += `/boards/${board.id}/cards`
            batchedUrls.push(url)
            url = ''
          } else {
            url += `/boards/${board.id}/cards,`
          }
          return null
        })

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
        })
      })
      .catch((e: Error) => dispatch({ type: FETCH_ALL_DATA_ERROR, payload: e }))
  }