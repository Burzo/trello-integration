import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Card, Cards } from '../../../../store/cards/types'
import { RootState } from '../../../../store'
import { Typography } from '@material-ui/core'
import { remapListIdCards, remapBoardIdCards } from '../../../../helpers'
import SimpleCard from '../../../helpers/SimpleCard/SimpleCard'
import moment from 'moment'

interface IProps {
  cards: Cards
}

const REK: FC<IProps> = ({ cards }) => {
  if (cards.loading) {
    return (
      <div className="ddv">
        <Typography className="ddv__heading">Loading cards...</Typography>
      </div>
    )
  }

  if (cards.error) {
    return (
      <div className="ddv">
        <Typography className="ddv__heading">Error: {cards.error}</Typography>
      </div>
    )
  }

  return (
    <div className="rek">
      <div>
        <h1 className="text-center">REK</h1>
      </div>
      <div>
        {cards.cards.length > 0 ? (
          cards.cards.map((card: Card) => <SimpleCard card={card} />)
        ) : (
          <p className="text-center">No cards found.</p>
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
  })
  return {
    cards: {
      ...store.cards,
      cards: remapListIdCards(
        store.lists.lists,
        remapBoardIdCards(store.boards.boards, filteredOutdatedCards),
      ),
    },
  }
}

export default connect(mapStateToProps)(REK)
