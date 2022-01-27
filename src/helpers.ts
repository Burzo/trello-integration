/* eslint-disable array-callback-return */
import { IBoard } from './store/boards/types'
import { Card } from './store/cards/types'
import { List } from './store/lists/types'
import moment from 'moment-timezone'
import { FilledList, IAllDataCompany } from './store/allData/types'

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
    if (card.idList.toLowerCase().trim() === 'ddv') {
      return true
    }
    return false
  })
}

export const getOutREK = (cards: Card[]): Card[] => {
  return cards.filter((card: Card) => {
    if (card.idList.toLowerCase().trim() === 'rek') {
      return true
    }
    return false
  })
}

export const getOutPaycheck = (company: IAllDataCompany): Card[] => {
  if (!company) {
    return []
  }
  const cards: Card[] = []

  company.lists.map((list) => {
    if (
      list.name.toLowerCase().trim() === 'place' ||
      list.name.toLowerCase().trim() === 'plače'
    ) {
      list.cards.forEach((card) => cards.push(card))
    }
  })

  return cards
}

export const getOutOverview = (company: IAllDataCompany): Card[] => {
  if (!company) {
    return []
  }
  const cards: Card[] = []

  company.lists.map((list) => {
    if (list.name.toLowerCase().trim() === 'osnovni podatki') {
      list.cards.forEach((card) => cards.push(card))
    }
  })

  return cards
}

export const getOutBasicInfo = (cards: Card[]): Card[] => {
  return cards.filter((card: Card) => {
    if (card.idList.toLowerCase().trim() === 'osnovni podatki') {
      return true
    }
    return false
  })
}

export const getOutCompanyOverview = (cards: Card[]): Card[] => {
  return cards.filter((card: Card) => {
    if (
      card.idList.toLowerCase().trim() === 'izdani računi (prihodki)' ||
      card.idList.toLowerCase().trim() === 'prejeti računi (odhodki)' ||
      card.idList.toLowerCase().trim() === 'banka' ||
      card.idList.toLowerCase().trim() === 'ddv plače ostalo' ||
      card.idList.toLowerCase().trim() === 'pregled bruto bilance'
    ) {
      return true
    }
    return false
  })
}

export const getOutCompanyOverviewAndBilance = (
  company: IAllDataCompany,
): Card[] => {
  if (!company) {
    return []
  }
  const cards: Card[] = []

  company.lists.map((list) => {
    if (
      list.name.toLowerCase().trim() === 'izdani računi (prihodki)' ||
      list.name.toLowerCase().trim() === 'prejeti računi (odhodki)' ||
      list.name.toLowerCase().trim() === 'banka' ||
      list.name.toLowerCase().trim() === 'ddv plače ostalo' ||
      list.name.toLowerCase().trim() === 'pregled bruto bilance' ||
      list.name.toLowerCase().trim() === `bilance ${moment().year()}`
    ) {
      list.cards.forEach((card) => cards.push(card))
    }
  })

  return cards
}

export const getOutCompanyBilance = (company: IAllDataCompany): Card[] => {
  if (!company) {
    return []
  }
  const cards: Card[] = []

  company.lists.map((list) => {
    if (list.name.toLowerCase().trim() === `bilance ${moment().year()}`) {
      list.cards.forEach((card) => cards.push(card))
    }
  })

  return cards
}

export const doesItHavePaycheck = (lists: List[], boardName: string) => {
  return (
    lists.filter((list: List) => {
      if (list.idBoard === boardName) {
        return true
      }
      return false
    }).length > 0
  )
}

export const calculatePercantage = (cards: Card[]): number => {
  const completedCards = cards.filter((card: Card) => card.dueComplete).length

  if (completedCards === 0) {
    return 0
  }
  return (completedCards / cards.length) * 100
}

export const NEW_calculateBilancePercantage = (
  cards: Card[],
): { percentage: number; green: boolean } => {
  let completedCards = cards.filter((card: Card) => card.dueComplete)

  let percentage = 0
  let green = false

  completedCards.map((card: Card) => {
    if (card.name.toLowerCase().trim() === 'ajpes') {
      percentage += 50
    }
    if (card.name.toLowerCase().trim() === 'furs') {
      percentage += 50
    }

    completedCards = completedCards.filter(
      (card: Card) => card.name.toLowerCase().trim() === 'bilanca',
    )
    if (completedCards.length > 0) {
      green = true
    }
  })
  return { percentage, green }
}

export const calculateBilancePercantage = (cards: Card[]): number => {
  let completedCards = cards.filter((card: Card) => card.dueComplete)

  let result = 0

  completedCards.map((card: Card) => {
    if (card.name.toLowerCase().trim() === 'ajpes') {
      result += 50
    }
    if (card.name.toLowerCase().trim() === 'furs') {
      result += 50
    }

    // If it's above 100% it changes color
    if (result === 100) {
      completedCards = completedCards.filter(
        (card: Card) => card.name.toLowerCase().trim() === 'plačilni nalogi',
      )
      if (completedCards.length > 0) {
        result += 50
      }
    }
  })
  return result
}

export const getOutListString = (
  company: IAllDataCompany,
  str: string,
  except: boolean = false,
  overdue: boolean = false,
): Card[] => {
  if (!company) {
    return []
  }
  const index = company.lists.findIndex((list) => {
    if (except) {
      return list.name.toLowerCase().trim() !== str
    }
    return list.name.toLowerCase().trim() === str
  })
  if (index < 0) {
    return []
  }
  if (overdue) {
    return company.lists[index].cards.filter((card: Card) => {
      return !card.dueComplete
    })
  }
  return company.lists[index].cards
}

export const mapBoardCardList = (
  companies: IBoard[],
  allCards: Card[],
): IAllDataCompany[] => {
  return companies.map((company) => {
    for (let i = 0; i < company.lists.length; i++) {
      const e = company.lists[i] as FilledList
      e.cards = e.cards || []
      allCards.map((card) => {
        if (card.idList === e.id) {
          e.cards.push(card)
        }
      })
    }
    return {
      id: company.id,
      name: company.name,
      lists: company.lists as FilledList[],
    }
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
    const trimmedLocale = locale
    return opt.languageCodeOnly ? trimmedLocale.split(/-|_/)[0] : trimmedLocale
  })
}

export const sort = (data: Card[] | List[]): Card[] | List[] => {
  return data.sort((a: Card | List, b: Card | List) => {
    const aa: string = a.idBoard
      .replace(' ', '')
      .replace('.', '')
      .toLowerCase()
      .trim()
    const bb: string = b.idBoard
      .replace(' ', '')
      .replace('.', '')
      .toLowerCase()
      .trim()

    return aa.localeCompare(bb)
  })
}

export const sortBoards = (data: IBoard[]): IBoard[] => {
  return data.sort((a: IBoard, b: IBoard) => {
    const aa: string = a.name
      .replace(' ', '')
      .replace('.', '')
      .toLowerCase()
      .trim()
    const bb: string = b.name
      .replace(' ', '')
      .replace('.', '')
      .toLowerCase()
      .trim()

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

export const filterOutEmptyPayCheckBoards = (
  boards: IBoard[],
  lists: List[],
) => {
  return boards.filter((board: IBoard) => {
    const isEmpty =
      lists.filter((list: List) => {
        return (
          list.idBoard === board.name &&
          (list.name.toLowerCase().trim() === 'place' ||
            list.name.toLowerCase().trim() === 'plače')
        )
      }).length <= 0
    return !isEmpty
  })
}

export const filterOutEmptyOverviewkBoards = (
  boards: IBoard[],
  lists: List[],
) => {
  return boards.filter((board: IBoard) => {
    const isEmpty =
      lists.filter((list: List) => {
        return (
          list.idBoard === board.name &&
          (list.name.toLowerCase().trim() === 'izdani računi (prihodki)' ||
            list.name.toLowerCase().trim() === 'prejeti računi (odhodki)' ||
            list.name.toLowerCase().trim() === 'banka' ||
            list.name.toLowerCase().trim() === 'ddv plače ostalo' ||
            list.name.toLowerCase().trim() === 'pregled bruto bilance')
        )
      }).length <= 0
    return !isEmpty
  })
}

export const gatherUpData = (data: any[]): any[] => {
  let result: any[] = []

  data.map((e: any) => {
    if (!e['200']) {
      console.log('PROBLEM, DID NOT GET 200 AS A RESPONSE')
    }
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
  return new Promise<Response>((resolve, reject): Promise<any> => {
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
  })
}
