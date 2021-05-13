import {
  AllBoardsTypes,
  FETCH_ALL_DATA_START,
  FETCH_ALL_DATA_SUCCESS,
  FETCH_ALL_DATA_ERROR,
  IAllData,
} from './types'

export const initialState: IAllData = {
  companies: [],
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
        loading: false,
        companies: [...action.payload],
      }
    case FETCH_ALL_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
