import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Card, Cards } from '../../../../store/cards/types'
import { RootState } from '../../../../store'
import { Typography } from '@material-ui/core'
import {
  remapListIdCards,
  remapBoardIdCards,
  getOutDDV,
} from '../../../../helpers'
import SimpleCard from '../../../helpers/SimpleCard/SimpleCard'
import moment from 'moment'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import AllDone from '../../../helpers/AllDone/AllDone'
import { Divider } from '@material-ui/core'

interface IProps {
  cards: Cards
}

const DDV: FC<IProps> = ({ cards }) => {
  if (cards.error) {
    return (
      <div className="ddv">
        <Typography className="ddv__heading">
          Error: {cards.error.message}
        </Typography>
      </div>
    )
  }

  return (
    <div className="ddv">
      <div>
        <Typography variant="h4" className="text-center mb-3">
          DDV za {moment().format('MMMM')}
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
  })
  return {
    cards: {
      ...store.cards,
      cards: getOutDDV(
        remapListIdCards(
          store.lists.lists,
          remapBoardIdCards(store.boards.boards, filteredOutdatedCards),
        ),
      ),
    },
  }
}

export default connect(mapStateToProps)(DDV)
