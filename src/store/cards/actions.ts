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
  CardPayloadObject,
  CREATE_CARD_START,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_ERROR,
  CreateCardTypes,
} from './types'
import { Dispatch } from 'react'
import { AppThunk } from '..'
import { IBoard } from '../boards/types'
import {
  handleTrelloTokenExpiry,
  manageCards,
  gatherUpData,
} from '../../helpers'

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
): AppThunk => (dispatch: Dispatch<AllCardsTypes>, state) => {
  dispatch({ type: FETCH_CARDS_START })

  let allCards: Card[] = []

  let url = ''
  const batchedUrls: string[] = []

  boards.map((board: IBoard, index) => {
    if (index % 10 === 0) {
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
      return fetch(
        `https://api.trello.com/1/batch?urls=${str}&key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${token}`,
      )
        .then((res: Response) => handleTrelloTokenExpiry(res))
        .then((data) => {
          data = gatherUpData(data)
          allCards = [...allCards, ...(data as Card[])]
          return null
        })
        .catch((e: Error) => {
          dispatch({ type: FETCH_CARDS_ERROR, payload: e })
          return null
        })
    }),
  )
    .then(() => {
      console.log('Cards loaded successfully.')
      allCards = manageCards(state().cards.cards, allCards)
      console.log(allCards)
      dispatch({ type: FETCH_CARDS_SUCCESS, payload: allCards })
    })
    .catch((error) => console.log(error))
}

export const updateCard = (
  token: string,
  card: Card,
  query: CardPayloadObject,
): AppThunk => (dispatch: Dispatch<UpdateCardTypes>) => {
  dispatch({ type: UPDATE_CARD_START, payload: card })

  fetch(
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

export const addACard = (
  token: string,
  listId: string,
  card: CardPayloadObject,
): AppThunk => (dispatch: Dispatch<CreateCardTypes>) => {
  dispatch({ type: CREATE_CARD_START })
  fetch(
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
