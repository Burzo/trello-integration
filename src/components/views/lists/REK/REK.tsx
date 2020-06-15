import React, { FC, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Card, Cards } from '../../../../store/cards/types'
import { RootState } from '../../../../store'
import { Typography, Divider } from '@material-ui/core'
import {
  remapListIdCards,
  remapBoardIdCards,
  getOutREK,
} from '../../../../helpers'
import SimpleCard from '../../../helpers/SimpleCard/SimpleCard'
import moment from 'moment'
import AllDone from '../../../helpers/AllDone/AllDone'

interface IProps {
  cards: Cards
}

const REK: FC<IProps> = ({ cards }) => {
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards])

  if (cards.error) {
    return (
      <div className="rek">
        <Typography className="rek__heading">
          Error: {cards.error.message}
        </Typography>
      </div>
    )
  }

  return (
    <div className="rek">
      <div>
        <Typography variant="h4" className="text-center mb-3">
          REK za {moment().format('MMMM')}
        </Typography>
      </div>
      <Divider style={{ marginBottom: '1rem' }} />
      <div>
        {cards.cards.length > 0 ? (
          cards.cards.map((card: Card) => (
            <SimpleCard key={card.id} card={card} />
          ))
        ) : (
          <AllDone />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  const thisMonth = moment().month()
  const thisYear = moment().year()
  // Filter by completed and also check if it's this month
  const filteredOutdatedCards = store.cards.cards.filter((card: Card) => {
    if (card.dueComplete === false && card.due) {
      const t = moment(card.due)
      if (t.month() === thisMonth && t.year() === thisYear) {
        return true
      }
    }
    return false
  })
  return {
    cards: {
      ...store.cards,
      cards: getOutREK(
        remapListIdCards(
          store.lists.lists,
          remapBoardIdCards(store.boards.boards, filteredOutdatedCards),
        ),
      ),
    },
  }
}

export default connect(mapStateToProps)(REK)
