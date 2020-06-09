import {
  AllBoardsTypes,
  FETCH_BOARDS_START,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_ERROR,
} from './types'
import { Dispatch } from 'react'
import { AppThunk } from '..'

export const fetchBoards = (store_id: string): AppThunk => (
  dispatch: Dispatch<AllBoardsTypes>,
) => {
  dispatch({ type: FETCH_BOARDS_START })
  fetch(
    `/api/${process.env.REACT_APP_ROOT_API_URL}/live_occupancy/v1/live_occupancy_data/get_current_occupancy?zone_id=${store_id}&format=json`,
  )
    .then((res: Response) => res.json())
    .then((data) => dispatch({ type: FETCH_BOARDS_SUCCESS, payload: data }))
    .catch((e: Error) => dispatch({ type: FETCH_BOARDS_ERROR, payload: e }))
}
