import { Card } from '../cards/types'
import { List } from '../lists/types'

export const FETCH_BOARDS_START = 'FETCH_BOARDS_START'
export const FETCH_BOARDS_SUCCESS = 'FETCH_BOARDS_SUCCESS'
export const FETCH_BOARDS_ERROR = 'FETCH_BOARDS_ERROR'

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

export interface IBoard {
  urls?: string
  name: string
  desc: string
  descData: string | null
  closed: boolean
  idOrganization: string | null
  idEnterprise: string | null
  limits: string | null
  pinned: string | null
  shortLink: string | null
  powerUps: any[]
  dateLastActivity: string | null
  idTags: any[]
  datePluginDisable: string | null
  creationMethod: string | null
  ixUpdate: string | null
  enterpriseOwned: boolean
  idBoardSource: string | null
  id: string
  starred: boolean
  url: string
  prefs: IPrefs
  subscribed: boolean
  labelNames: ILabelNames
  shortUrl: string
  templateGallery: string | null
  premiumFeatures: any[]
  memberships: IMember[]
  cards: Card[]
  lists: List[]
}

export interface IBoards {
  boards: IBoard[]
  loading: boolean
  error: Error | null
}

export interface fetchBoardsStart {
  type: typeof FETCH_BOARDS_START
}

export interface fetchBoardsSuccess {
  type: typeof FETCH_BOARDS_SUCCESS
  payload: IBoard[]
}

export interface fetchBoardsError {
  type: typeof FETCH_BOARDS_ERROR
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
