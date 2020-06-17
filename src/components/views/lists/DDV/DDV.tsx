import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Card, Cards } from '../../../../store/cards/types'
import { RootState } from '../../../../store'
import { Typography } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import {
  remapListIdCards,
  remapBoardIdCards,
  getOutDDV,
} from '../../../../helpers'
import SimpleCard from '../../../helpers/SimpleCard/SimpleCard'
import moment from 'moment'
import AllDone from '../../../helpers/AllDone/AllDone'
import { Divider } from '@material-ui/core'

const ITEMS_PER_PAGE: number = 15

interface IProps {
  cards: Cards
}

const DDV: FC<IProps> = ({ cards }) => {
  const [page, setPage] = React.useState(1)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

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
      <div className="text-center mb-3">
        <Typography display="inline" variant="h6">
          DDV za&nbsp;
        </Typography>
        <Typography display="inline" variant="h5">
          {moment().format('MMMM').toUpperCase()}
        </Typography>
        <Typography display="inline" variant="body2">
          &nbsp;(skupno {cards.cards.length})
        </Typography>
      </div>
      {cards.cards.length > ITEMS_PER_PAGE && (
        <Pagination
          count={Math.floor(cards.cards.length / ITEMS_PER_PAGE) + 1}
          page={page}
          onChange={handleChange}
          color="primary"
          classes={{ ul: 'center' }}
        />
      )}
      <Divider style={{ marginBottom: '1rem', marginTop: '0.5rem' }} />
      <div className="cards-container">
        {cards.cards.length > 0 ? (
          cards.cards.map((card: Card, index) => {
            let lowerLimit = page * ITEMS_PER_PAGE - ITEMS_PER_PAGE
            let higherLimit = page * ITEMS_PER_PAGE
            if (index >= lowerLimit && index < higherLimit) {
              return <SimpleCard key={card.id} card={card} />
            }
            return null
          })
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
