export const FETCH_LISTS_START = 'FETCH_LISTS_START'
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS'
export const FETCH_LISTS_ERROR = 'FETCH_LISTS_ERROR'

export interface List {
  id: string
  name: string
  closed: boolean
  pos: number
  softLimit: null | string
  idBoard: string
  subscribed: boolean
}

export interface Lists {
  lists: List[]
  loading: boolean
  error: Error | null
}

export interface fetchListsStart {
  type: typeof FETCH_LISTS_START
}

export interface fetchListsSuccess {
  type: typeof FETCH_LISTS_SUCCESS
  payload: List[]
}

export interface fetchListsError {
  type: typeof FETCH_LISTS_ERROR
  payload: Error
}

export type AllListsTypes =
  | fetchListsError
  | fetchListsStart
  | fetchListsSuccess
