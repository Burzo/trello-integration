import {
  AllListsTypes,
  FETCH_LISTS_START,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_ERROR,
  Lists,
} from './types'

export const initialState: Lists = {
  lists: [],
  loading: true,
  error: null,
}

export const listsReducer = (
  state: Lists = initialState,
  action: AllListsTypes,
): Lists => {
  switch (action.type) {
    case FETCH_LISTS_START:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        lists: action.payload,
      }
    case FETCH_LISTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
