import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Card, Cards } from '../../../../store/cards/types'
import { RootState } from '../../../../store'
import { Typography } from '@material-ui/core'
import { remapListIdCards, remapBoardIdCards } from '../../../../helpers'
import SimpleCard from '../../../helpers/SimpleCard/SimpleCard'
import moment from 'moment'
import AllDone from '../../../helpers/AllDone/AllDone'
import { Divider } from '@material-ui/core'

interface IProps {
  cards: Cards
}

const PersonalTasks: FC<IProps> = ({ cards }) => {
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
  console.log(store.googleUser)
  // Filter by completed and also check if it's this month
  const mappedCards = remapListIdCards(
    store.lists.lists,
    remapBoardIdCards(store.boards.boards, store.cards.cards),
  )
  return {
    cards: {
      ...store.cards,
      cards: mappedCards,
    },
  }
}

export default connect(mapStateToProps)(PersonalTasks)
