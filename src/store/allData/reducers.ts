import { Card, CREATE_CARD_SUCCESS, UPDATE_CARD_SUCCESS } from '../cards/types'
import {
  AllBoardsTypes,
  FETCH_ALL_DATA_START,
  FETCH_ALL_DATA_SUCCESS,
  FETCH_ALL_DATA_ERROR,
  IAllData,
  IAllDataCompany,
  FilledList,
  INITIAL_LOAD,
} from './types'

export const initialState: IAllData = {
  companies: [],
  initialLoad: false,
  loading: true,
  error: null,
}

export const allDataReducer = (
  state: IAllData = initialState,
  action: AllBoardsTypes,
): IAllData => {
  switch (action.type) {
    case FETCH_ALL_DATA_START:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case FETCH_ALL_DATA_SUCCESS:
      return {
        ...state,
        initialLoad: true,
        loading: false,
        companies: [...action.payload],
      }
    case FETCH_ALL_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        companies: state.companies.map((company: IAllDataCompany) => {
          return {
            ...company,
            lists: company.lists.map((list: FilledList) => {
              return {
                ...list,
                cards: list.cards.map((card: Card) => {
                  if (action.payload.id === card.id) {
                    return action.payload
                  }
                  return card
                }),
              }
            }),
          }
        }),
      }
    case CREATE_CARD_SUCCESS:
      return {
        ...state,
        companies: state.companies.map((company: IAllDataCompany) => {
          return {
            ...company,
            lists: company.lists.map((list: FilledList) => {
              if (action.payload.idList === list.id) {
                return {
                  ...list,
                  cards: [...list.cards, action.payload],
                }
              }
              return list
            }),
          }
        }),
      }
    case INITIAL_LOAD:
      return {
        ...state,
        initialLoad: true,
      }
    default:
      return state
  }
}
