import { IBoard } from './store/boards/types'
import { Card } from './store/cards/types'
import { List } from './store/lists/types'

declare global {
  interface Window {
    Trello: any
  }
}

export const findBoardName = (boards: IBoard[], data: Card | List) => {
  let result = null
  // eslint-disable-next-line array-callback-return
  boards.map((board: IBoard) => {
    if (board.id === data.idBoard) {
      result = board.name
    }
  })
  return result || data.idBoard
}

export const findListName = (lists: List[], data: Card) => {
  let result = null
  // eslint-disable-next-line array-callback-return
  lists.map((list: List) => {
    if (list.id === data.idList) {
      result = list.name
    }
  })
  return result || data.idList
}

export const remapBoardIdCards = (boards: IBoard[], cards: Card[]): Card[] => {
  return cards.map((card: Card) => {
    card.idBoard = findBoardName(boards, card)
    return card
  })
}

export const remapListIdCards = (lists: List[], cards: Card[]): Card[] => {
  return cards.map((card: Card) => {
    card.idList = findListName(lists, card)
    return card
  })
}

export const remapBoardIdLists = (boards: IBoard[], lists: List[]): List[] => {
  return lists.map((list: List) => {
    list.idBoard = findBoardName(boards, list)
    return list
  })
}

export const handleTrelloTokenExpiry = (res: Response) => {
  // Token expired
  if (res.status === 401) {
    window.Trello.deauthorize()
    window.location.reload()
  }
  return res.json()
}
