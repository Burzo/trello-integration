export const FETCH_CARDS_START = 'FETCH_CARDS_START'
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS'
export const FETCH_CARDS_ERROR = 'FETCH_CARDS_ERROR'

export const UPDATE_CARD_START = 'UPDATE_CARD_START'
export const UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS'
export const UPDATE_CARD_ERROR = 'UPDATE_CARD_ERROR'

export const CREATE_CARD_START = 'CREATE_CARD_START'
export const CREATE_CARD_SUCCESS = 'CREATE_CARD_SUCCESS'
export const CREATE_CARD_ERROR = 'CREATE_CARD_ERROR'

export interface Badge {
  attachmentsByType: object
  location: boolean
  votes: number
  viewingMemberVoted: boolean
  subscribed: boolean
  fogbugz: string
  checkItems: number
  checkItemsChecked: number
  checkItemsEarliestDue: string | null
  comments: number
  attachments: number
  description: boolean
  due: string | null
  dueComplete: true
}

export interface Cover {
  idAttachment: string | null
  color: string | null
  idUploadedBackground: string | null
  size: string
  brightness: string
}

export interface Card {
  id: string
  checkItemStates: string | null
  closed: boolean
  dateLastActivity: string | null
  desc: string
  descData: any
  dueReminder: string | null
  idBoard: string
  idList: string
  idMembersVoted: any[]
  idShort: number
  idAttachmentCover: string | null
  idLabels: any[]
  manualCoverAttachment: boolean
  name: string
  pos: number
  shortLink: string
  isTemplate: false
  badges: Badge
  dueComplete: boolean
  due: string | null
  idChecklists: any[]
  idMembers: any[]
  labels: any[]
  shortUrl: string
  subscribed: boolean
  url: string
  cover: Cover
  loading: boolean
  error: Error | null
}

export interface UpdateCard {
  checkItemStates?: string | null
  closed?: boolean
  dateLastActivity?: string | null
  desc?: string
  descData?: any
  dueReminder?: string | null
  idBoard?: string
  idList?: string
  idMembersVoted?: any[]
  idShort?: number
  idAttachmentCover?: string | null
  idLabels?: any[]
  manualCoverAttachment?: boolean
  name?: string
  pos?: number
  shortLink?: string
  isTemplate?: false
  badges?: Badge
  dueComplete?: boolean
  due?: string | null
  idChecklists?: any[]
  idMembers?: any[]
  labels?: any[]
  shortUrl?: string
  subscribed?: boolean
  url?: string
  cover?: Cover
}

export interface Cards {
  cards: Card[]
  loading: boolean
  error: Error | null
}

export interface CardPayloadObject {
  idList?: string
  id?: string
  checkItemStates?: string | null
  closed?: boolean
  dateLastActivity?: string | null
  desc?: string
  descData?: any
  dueReminder?: string | null
  idBoard?: string
  idMembersVoted?: any[]
  idShort?: number
  idAttachmentCover?: string | null
  idLabels?: any[]
  manualCoverAttachment?: boolean
  name?: string
  pos?: number
  shortLink?: string
  isTemplate?: false
  badges?: Badge
  dueComplete?: boolean
  due?: string | null
  idChecklists?: any[]
  idMembers?: any[]
  labels?: any[]
  shortUrl?: string
  subscribed?: boolean
  url?: string
  cover?: Cover
  loading?: boolean
  error?: Error | null
}

export interface fetchCardsStart {
  type: typeof FETCH_CARDS_START
}

export interface fetchCardsSuccess {
  type: typeof FETCH_CARDS_SUCCESS
  payload: Card[]
}

export interface fetchCardsError {
  type: typeof FETCH_CARDS_ERROR
  payload: Error
}

export interface updateCardStart {
  type: typeof UPDATE_CARD_START
  payload: Card
}

export interface updateCardSuccess {
  type: typeof UPDATE_CARD_SUCCESS
  payload: Card
}

export interface updateCardError {
  type: typeof UPDATE_CARD_ERROR
  payload: Error
  card: Card
}

export interface createCardsStart {
  type: typeof CREATE_CARD_START
}

export interface createCardsSuccess {
  type: typeof CREATE_CARD_SUCCESS
  payload: Card
}

export interface createCardsError {
  type: typeof CREATE_CARD_ERROR
  payload: Error
}

export type AllCardsTypes =
  | fetchCardsError
  | fetchCardsStart
  | fetchCardsSuccess

export type UpdateCardTypes =
  | updateCardStart
  | updateCardSuccess
  | updateCardError

export type CreateCardTypes =
  | createCardsSuccess
  | createCardsError
  | createCardsStart
