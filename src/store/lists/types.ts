export const FETCH_OCCUPANCY_START = 'FETCH_OCCUPANCY_START'
export const FETCH_OCCUPANCY_SUCCESS = 'FETCH_OCCUPANCY_SUCCESS'
export const FETCH_OCCUPANCY_ERROR = 'FETCH_OCCUPANCY_ERROR'

export interface Occupancy {
  zone_name: string
  unit_disconnected: boolean
  report_on: boolean
  target_occupancy: number
  current_occupancy: number
}

export interface Occupancies {
  occupancies: Occupancy[]
  loading: boolean
  error: Error | null
}

export interface fetchOccupancyStart {
  type: typeof FETCH_OCCUPANCY_START
}

export interface fetchOccupancySuccess {
  type: typeof FETCH_OCCUPANCY_SUCCESS
  payload: Occupancy[]
}

export interface fetchOccupancyError {
  type: typeof FETCH_OCCUPANCY_ERROR
  payload: Error
}

export type AllOccupancyTypes =
  | fetchOccupancyError
  | fetchOccupancyStart
  | fetchOccupancySuccess
