import {
  Cards,
  AllCardsTypes,
  FETCH_CARDS_START,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
} from './types'

export const initialState: Cards = {
  cards: [],
  loading: true,
  error: null,
}

export const cardsReducer = (
  state: Cards = initialState,
  action: AllCardsTypes,
): Cards => {
  switch (action.type) {
    case FETCH_CARDS_START:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: [...state.cards, ...action.payload],
      }
    case FETCH_CARDS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
