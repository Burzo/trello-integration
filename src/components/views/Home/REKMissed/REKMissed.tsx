import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Card, Cards } from '../../../../store/cards/types'
import { RootState } from '../../../../store'
import { Typography } from '@material-ui/core'
import {
  remapListIdCards,
  remapBoardIdCards,
  getOutREK,
} from '../../../../helpers'
import SimpleCard from '../../../helpers/SimpleCard/SimpleCard'
import moment from 'moment'
import Pagination from '@material-ui/lab/Pagination'
import AllDone from '../../../helpers/AllDone/AllDone'
import { Filter } from '../../../helpers/Filter/CardFilter'
import { Error } from '../../../helpers/Error/Error'

const ITEMS_PER_PAGE: number = 9

interface IProps {
  cards: Cards
}

const REKMissed: FC<IProps> = ({ cards }) => {
  const [page, setPage] = React.useState(1)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  if (cards.error) {
    return <Error>{cards.error.message}</Error>
  }

  return (
    <div className="rek-missed">
      <div className="text-center mb-1">
        <Typography display="inline" variant="h6">
          Zamujen REK
        </Typography>
        {cards.cards.length !== 0 && (
          <Typography display="inline" variant="body1">
            &nbsp;(skupno {cards.cards.length})
          </Typography>
        )}
      </div>
      <Filter
        className="danger"
        render={(filteredCards) => {
          if (filteredCards.length <= 0) {
            return <AllDone />
          }
          return filteredCards.map((card: Card, index) => {
            let lowerLimit = page * ITEMS_PER_PAGE - ITEMS_PER_PAGE
            let higherLimit = page * ITEMS_PER_PAGE
            if (index >= lowerLimit && index < higherLimit) {
              return <SimpleCard className="danger" key={card.id} card={card} />
            }
            return null
          })
        }}
        cards={cards.cards}
      >
        {(filteredCards) => (
          <Pagination
            count={Math.floor(filteredCards.length / ITEMS_PER_PAGE) + 1}
            page={page}
            onChange={handleChange}
            color="primary"
            classes={{ ul: 'center' }}
          />
        )}
      </Filter>
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  const thisMonth = moment().month()
  const thisYear = moment().year()
  const thisDay = moment().date()
  // Filter by completed and also check if it's this month
  const filteredOutdatedCards = store.cards.cards.filter((card: Card) => {
    if (card.dueComplete === false && card.due) {
      const t = moment(card.due)
      if (
        t.month() <= thisMonth &&
        t.year() <= thisYear &&
        t.date() < thisDay
      ) {
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

export default connect(mapStateToProps)(REKMissed)
