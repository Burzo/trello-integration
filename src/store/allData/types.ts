import { Card } from '../cards/types'
import { List } from '../lists/types'

export const FETCH_ALL_DATA_START = 'FETCH_ALL_DATA_START'
export const FETCH_ALL_DATA_SUCCESS = 'FETCH_ALL_DATA_SUCCESS'
export const FETCH_ALL_DATA_ERROR = 'FETCH_ALL_DATA_ERROR'

export const ADD_CARDS_TO_BOARD = 'ADD_CARDS_TO_BOARD'
export const ADD_LISTS_TO_BOARD = 'ADD_LISTS_TO_BOARD'

export interface IPrefs {
  permissionLevel: string
  hideVotes: boolean
  voting: string
  comments: string
  invitations: string
  selfJoin: boolean
  cardCovers: boolean
  isTemplate: boolean
  cardAging: string
  calendarFeedEnabled: boolean
  background: string
  backgroundImage: string | null
  backgroundImageScaled: string | null
  backgroundTile: boolean
  backgroundBrightness: string
  backgroundColor: string
  backgroundBottomColor: string
  backgroundTopColor: string
  canBePublic: boolean
  canBeEnterprise: boolean
  canBeOrg: boolean
  canBePrivate: boolean
  canInvite: boolean
}

export interface ILabelNames {
  green: string
  yellow: string
  orange: string
  red: string
  purple: string
  blue: string
  sky: string
  lime: string
  pink: string
  black: string
}

export interface IMember {
  id: string
  idMember: string
  memberType: string
  unconfirmed: boolean
  deactivated: boolean
}

export interface IAllDataCompany {
  name: string
  lists: FilledList[]
}

export interface FilledList extends List {
  cards: Card[]
}

export interface IAllData {
  companies: IAllDataCompany[]
  loading: boolean
  error: Error | null
}

export interface fetchBoardsStart {
  type: typeof FETCH_ALL_DATA_START
}

export interface fetchBoardsSuccess {
  type: typeof FETCH_ALL_DATA_SUCCESS
  payload: IAllDataCompany[]
}

export interface fetchBoardsError {
  type: typeof FETCH_ALL_DATA_ERROR
  payload: Error
}

export interface addCardsToBoards {
  type: typeof ADD_CARDS_TO_BOARD
  payload: Card[]
}

export interface addListsToBoards {
  type: typeof ADD_LISTS_TO_BOARD
  payload: List[]
}

export type AllBoardsTypes =
  | fetchBoardsError
  | fetchBoardsStart
  | fetchBoardsSuccess
  | addCardsToBoards
  | addListsToBoards
