/* eslint-disable array-callback-return */
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

export const sort = (data: Card[] | List[]): Card[] | List[] => {
  return data.sort((a: Card | List, b: Card | List) => {
    const aa: string = a.idBoard.replace(' ', '').replace('.', '').toLowerCase()
    const bb: string = b.idBoard.replace(' ', '').replace('.', '').toLowerCase()

    return aa.localeCompare(bb)
  })
}

export const manageCards = (cards: Card[], newCards: Card[]): Card[] => {
  if (newCards.length === 0) {
    return []
  }
  return newCards as Card[]
}

export const manageLists = (lists: List[], newLists: List[]): List[] => {
  if (newLists.length === 0) {
    return []
  }
  return newLists as List[]
}

export const gatherUpData = (data: any[]): any[] => {
  let result: any[] = []

  data.map((e: any) => {
    if (Array.isArray(e['200'])) {
      result = [...result, ...e['200']]
    } else {
      result.push(e['200'])
    }
  })

  return result
}

// interface IFetchRetryOptions {
//   method?: string
//   body?: string
//   headers?: { string: string }
// }

const RETRY_RATE = 10000

export const fetchRetry = (url: string, options = {}, times: number = 5) => {
  return new Promise<Response>(
    (resolve, reject): Promise<any> => {
      return fetch(url, options)
        .then((res) => {
          // Could also be res.status !== 200 in the future
          if (res.status === 429) {
            console.error(
              `Reached te API rate limit. Will try again in ${
                RETRY_RATE / 1000
              } seconds. Retries left - ${times}`,
            )
            window.setTimeout(() => {
              fetchRetry(url, options, times - 1)
                .then((res) => resolve(res))
                .catch((e) => reject(e))
            }, RETRY_RATE)
          } else {
            resolve(res)
          }
        })
        .catch((e) => {
          reject(e)
        })
    },
  )
}
