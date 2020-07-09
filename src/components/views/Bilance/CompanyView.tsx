import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import { Error } from '../../helpers/Error/Error'
import './style.scss'
import { RootState } from '../../../store'
import { Card } from '../../../store/cards/types'
import {
  remapListIdCards,
  remapBoardIdCards,
  getOutOnlyBilance,
} from '../../../helpers'
import { connect } from 'react-redux'
import moment from 'moment'
import CompanyCard from '../../helpers/SimpleCard/CompanyCard'

interface IProps {
  company: string
  cards?: Card[]
}

function CompanyView({ company, cards = [] }: IProps) {
  if (company !== '' && cards.length <= 0) {
    return (
      <Error>
        {`Ne najdem informacij o podjetju ${company}. Preveri Trello, če obstaja stolpec "Bilance ${moment().year()}".`}
      </Error>
    )
  }

  return (
    <div className="text-center">
      <Typography display="inline" variant="h6">
        {company}
      </Typography>
      <Divider style={{ marginBottom: '1rem', marginTop: '0.5rem' }} />
      <div className="companies">
        {cards.map((card: Card) => {
          if (
            card.idBoard.toLowerCase().trim() === company.toLowerCase().trim()
          ) {
            return <CompanyCard key={card.id} card={card} />
          }
          return null
        })}
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

  const cards = getOutOnlyBilance(
    remapListIdCards(
      store.lists.lists,
      remapBoardIdCards(store.boards.boards, filteredCards),
    ),
  )

  return {
    cards: cards,
    company: store.company,
  }
}

export default connect(mapStateToProps)(CompanyView)
