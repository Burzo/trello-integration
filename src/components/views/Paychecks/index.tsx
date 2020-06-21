import React from 'react'
import { Grid } from '@material-ui/core'
import SelectCompany from './Companies/SelectCompany'
import Company from './Companies/Company'
import { RootState } from '../../../store'
import moment from 'moment'
import { Card, Cards } from '../../../store/cards/types'
import {
  getOutPaycheck,
  remapListIdCards,
  remapBoardIdCards,
} from '../../../helpers'
import { connect } from 'react-redux'

interface IProps {
  cards: Cards
}

const Paychecks = ({ cards }: IProps) => {
  const [company, setCompany] = React.useState('')

  const isolateCompany = () => {
    console.log(
      cards.cards.filter((card: Card) => {
        console.log(card.idBoard)
        console.log(company)
      }),
    )
    return cards.cards.filter(
      (card: Card) => card.idBoard.toLowerCase() === company.toLowerCase(),
    )
  }

  return (
    <div className="home">
      <Grid className="layout" container spacing={3}>
        <Grid className="layout-columns" item xs={3}>
          <SelectCompany company={company} setCompany={setCompany} />
        </Grid>
        <Grid className="layout-columns" item xs={9}>
          <Company data={isolateCompany()} company={company} />
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  return {
    cards: {
      ...store.cards,
      cards: getOutPaycheck(
        remapListIdCards(
          store.lists.lists,
          remapBoardIdCards(store.boards.boards, store.cards.cards),
        ),
      ),
    },
  }
}

export default connect(mapStateToProps)(Paychecks)
