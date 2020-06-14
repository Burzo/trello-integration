import { IBoard } from './store/boards/types'
import { Card } from './store/cards/types'
import { List } from './store/lists/types'
import _ from 'lodash'
import { stringify } from 'querystring'

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
  if (newCards.length === 0) {
    return cards
  }
  if (cards.length === 0) {
    return newCards
  }

  let result: Card[] = cards

  let exists = false
  newCards.map((newCard: Card) => {
    exists = true
    cards.map((card: Card) => {
      if (card.id === newCard.id) {
        if (_.isEqual(card, newCard)) {
          exists = false
        } else {
          exists = true
          result = result.filter((e: Card) => e.id !== card.id)
        }
      }
    })
    if (exists) {
      result.push(newCard)
    }
  })
  result.sort((a, b) => {
    return a.id.localeCompare(b.id)
  })
  return [...result]
}

export const filterOutExistingLists = (
  lists: List[],
  newLists: List[],
): List[] => {
  if (newLists.length === 0) {
    return lists
  }
  if (lists.length === 0) {
    return newLists
  }

  let result: List[] = lists

  let exists = false
  newLists.map((newList: List) => {
    exists = true
    lists.map((list: List) => {
      if (list.id === newList.id) {
        if (_.isEqual(list, newList)) {
          exists = false
        } else {
          exists = true
          result = result.filter((e: List) => e.id !== list.id)
        }
      }
    })
    if (exists) {
      result.push(newList)
    }
  })
  return [...result]
}

export const getTrelloToken = () => window.Trello.token()

export function getBrowserLocales(options = {}) {
  const defaultOptions = {
    languageCodeOnly: false,
  }
  const opt = {
    ...defaultOptions,
    ...options,
  }
  const browserLocales =
    navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages

  if (!browserLocales) {
    return undefined
  }
  return browserLocales.map((locale) => {
    const trimmedLocale = locale.trim()
    return opt.languageCodeOnly ? trimmedLocale.split(/-|_/)[0] : trimmedLocale
  })
}
