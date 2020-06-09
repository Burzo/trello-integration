import {
  Occupancies,
  AllOccupancyTypes,
  FETCH_OCCUPANCY_START,
  FETCH_OCCUPANCY_SUCCESS,
  FETCH_OCCUPANCY_ERROR,
} from './types'

export const initialState: Occupancies = {
  occupancies: [],
  loading: true,
  error: null,
}

export const occupancyReducer = (
  state: Occupancies = initialState,
  action: AllOccupancyTypes,
): Occupancies => {
  switch (action.type) {
    case FETCH_OCCUPANCY_START:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case FETCH_OCCUPANCY_SUCCESS:
      return {
        ...state,
        loading: false,
        occupancies: [...action.payload],
      }
    case FETCH_OCCUPANCY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
