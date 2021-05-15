import {
  Card,
  UPDATE_CARD_START,
  UPDATE_CARD_ERROR,
  UPDATE_CARD_SUCCESS,
  UpdateCardTypes,
  CardPayloadObject,
  CREATE_CARD_START,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_ERROR,
  CreateCardTypes,
} from './types'
import { Dispatch } from 'react'
import { AppThunk } from '..'
import { handleTrelloTokenExpiry, fetchRetry } from '../../helpers'

export const updateCard =
  (token: string, card: Card, query: CardPayloadObject): AppThunk =>
  (dispatch: Dispatch<UpdateCardTypes>) => {
    dispatch({ type: UPDATE_CARD_START, payload: card })

    fetchRetry(
      `https://api.trello.com/1/cards/${card.id}/?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${token}`,
      {
        method: 'put',
        body: JSON.stringify(query),
        headers: {
          'Content-Type': 'application/json',
        },
      },
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

export const addACard =
  (token: string, listId: string, card: CardPayloadObject): AppThunk =>
  (dispatch: Dispatch<CreateCardTypes>) => {
    dispatch({ type: CREATE_CARD_START })
    fetchRetry(
      `https://api.trello.com/1/cards?idList=${listId}&key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${token}`,
      {
        method: 'post',
        body: JSON.stringify(card),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res: Response) => handleTrelloTokenExpiry(res))
      .then((data) => dispatch({ type: CREATE_CARD_SUCCESS, payload: data }))
      .catch((e: Error) => dispatch({ type: CREATE_CARD_ERROR, payload: e }))
  }
