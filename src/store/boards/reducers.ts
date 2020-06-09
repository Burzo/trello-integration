import {
  AllBoardsTypes,
  FETCH_BOARDS_START,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_ERROR,
  IBoards,
} from './types'

export const initialState: IBoards = {
  boards: [],
  loading: true,
  error: null,
}

export const boardsReducer = (
  state: IBoards = initialState,
  action: AllBoardsTypes,
): IBoards => {
  switch (action.type) {
    case FETCH_BOARDS_START:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case FETCH_BOARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        boards: [...action.payload],
      }
    case FETCH_BOARDS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
