import {
  Cards,
  AllCardsTypes,
  FETCH_CARDS_START,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
  Card,
  UPDATE_CARD_START,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_ERROR,
  UpdateCardTypes,
} from './types'

export const initialState: Cards = {
  cards: [],
  loading: true,
  error: null,
}

export const cardsReducer = (
  state: Cards = initialState,
  action: AllCardsTypes | UpdateCardTypes,
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
        cards: action.payload,
      }
    case FETCH_CARDS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case UPDATE_CARD_START:
      return {
        ...state,
        cards: state.cards.map((card: Card) => {
          if (action.payload.id === card.id) {
            card.loading = true
          }
          return card
        }),
      }
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        cards: state.cards.map((card: Card) => {
          if (action.payload.id === card.id) {
            card = action.payload
          }
          return card
        }),
      }
    case UPDATE_CARD_ERROR:
      return {
        ...state,
        cards: state.cards.map((card: Card) => {
          if (action.card.id === card.id) {
            card.loading = false
            card.error = action.payload
          }
          return card
        }),
      }
    default:
      return state
  }
}
