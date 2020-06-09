import {
  AllOccupancyTypes,
  FETCH_OCCUPANCY_START,
  FETCH_OCCUPANCY_SUCCESS,
  FETCH_OCCUPANCY_ERROR,
} from './types'
import { Dispatch } from 'react'
import { AppThunk } from '..'

export const fetchOccupancy = (store_id: string): AppThunk => (
  dispatch: Dispatch<AllOccupancyTypes>,
) => {
  dispatch({ type: FETCH_OCCUPANCY_START })
  fetch(
    `/api/${process.env.REACT_APP_ROOT_API_URL}/live_occupancy/v1/live_occupancy_data/get_current_occupancy?zone_id=${store_id}&format=json`,
  )
    .then((res: Response) => res.json())
    .then((data) =>
      dispatch({ type: FETCH_OCCUPANCY_SUCCESS, payload: data.occupancies }),
    )
    .catch((e: Error) => dispatch({ type: FETCH_OCCUPANCY_ERROR, payload: e }))
}
