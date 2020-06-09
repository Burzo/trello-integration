export const FETCH_CARDS_START = 'FETCH_CARDS_START'
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS'
export const FETCH_CARDS_ERROR = 'FETCH_CARDS_ERROR'

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
}

export interface Cards {
  cards: Card[]
  loading: boolean
  error: Error | null
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

export type AllCardsTypes =
  | fetchCardsError
  | fetchCardsStart
  | fetchCardsSuccess
