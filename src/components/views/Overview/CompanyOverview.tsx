import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import { Error } from '../../helpers/Error/Error'
import './style.scss'
import { RootState } from '../../../store'
import { Card } from '../../../store/cards/types'
import {
  remapListIdCards,
  remapBoardIdCards,
  getOutCompanyOverview,
  getOutIzdani,
  getOutPrejeti,
  getOutBank,
  getOutRest,
  getOutBilance,
} from '../../../helpers'
import { connect } from 'react-redux'
import OverviewColumn from './OverviewColumn'

interface CompanyOverview {
  izdani: Card[]
  prejeti: Card[]
  bank: Card[]
  rest: Card[]
  bilance: Card[]
}

const emptyState: CompanyOverview = {
  izdani: [],
  prejeti: [],
  bank: [],
  rest: [],
  bilance: [],
}

interface IProps {
  company: string
  cards?: CompanyOverview
}

function CompanyOverview({ company, cards = emptyState }: IProps) {
  if (company !== '' && cards === emptyState) {
    return (
      <Error>
        {`Ne najdem podatkov za ${company}. Preveri Trello, če obstajajo stolpci IZDANI RAČUNI (PRIHODKI), PREJETI RAČUNI (ODHODKI), BANKA, DDV PLAČE OSTALO, PREGLED BRUTO BILANCE.`}
      </Error>
    )
  }

  return (
    <div className="text-center">
      <Typography display="inline" variant="h6">
        {company}
      </Typography>
      <Divider style={{ marginBottom: '1rem', marginTop: '0.5rem' }} />
      <div className="overview">
        <OverviewColumn
          company={company}
          column="Izdani računi (prihodki)"
          cards={cards.izdani}
        />
        <OverviewColumn
          company={company}
          column="Prejeti računi (odhodki)"
          cards={cards.prejeti}
        />
        <OverviewColumn company={company} column="Banka" cards={cards.bank} />
        <OverviewColumn
          company={company}
          column="DDV / Plače / Ostalo"
          cards={cards.rest}
        />
        <OverviewColumn
          company={company}
          column="Bilance"
          cards={cards.bilance}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  // If company doesn't exist, don't return any cards
  const filteredCards = store.cards.cards.filter((card: Card) => {
    return (
      card.idBoard.toLowerCase().trim() === store.company.toLowerCase().trim()
    )
  })

  // calculate percentage here to display
  //   const percentage =

  const allCards = getOutCompanyOverview(
    remapListIdCards(
      store.lists.lists,
      remapBoardIdCards(store.boards.boards, filteredCards),
    ),
  )

  const izdani = getOutIzdani(allCards)
  const prejeti = getOutPrejeti(allCards)
  const bank = getOutBank(allCards)
  const rest = getOutRest(allCards)
  const bilance = getOutBilance(allCards)

  return {
    cards: {
      izdani,
      prejeti,
      bank,
      rest,
      bilance,
    },
    company: store.company,
  }
}

export default connect(mapStateToProps)(CompanyOverview)
