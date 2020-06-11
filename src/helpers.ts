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

export const getOutDDV = (cards: Card[]): Card[] => {
  return cards.filter((card: Card) => {
    if (card.idList.toLowerCase() === 'ddv') {
      return true
    }
    return false
  })
}

export const getOutREK = (cards: Card[]): Card[] => {
  return cards.filter((card: Card) => {
    if (card.idList.toLowerCase() === 'rek') {
      return true
    }
    return false
  })
}

export const filterOutExistingCards = (
  cards: Card[],
  newCards: Card[],
): Card[] => {
  let result: Card[] = cards
  // console.log(cards)
  if (newCards.length === 0) {
    return cards
  }
  if (cards.length === 0) {
    return newCards
  }
  let exists = false
  newCards.map((newCard: Card) => {
    exists = true
    cards.map((card: Card) => {
      if (card.id === newCard.id) {
        exists = false
      }
    })
    if (exists) {
      result.push(newCard)
    }
  })
  console.log('CARDS - ', result)

  // console.log('OLD CARDS - ', cards)
  // console.log('NEW CARDS - ', newCards)
  return [...result]
}

export const filterOutExistingLists = (
  lists: List[],
  newLists: List[],
): List[] => {
  let result: List[] = lists
  if (newLists.length === 0) {
    return lists
  }
  if (lists.length === 0) {
    return newLists
  }

  let exists = false
  newLists.map((newList: List) => {
    exists = false
    lists.map((list: List) => {
      // console.log(card, newCard)
      if (list.id === newList.id) {
        exists = true
      }
    })
    if (exists) {
      result.push(newList)
    }
  })
  console.log('LISTS - ', result)

  // console.log('OLD LISTS - ', lists)
  // console.log('NEW LISTS - ', newLists)
  return [...result]
}

export const getTrelloToken = () => window.Trello.token()
