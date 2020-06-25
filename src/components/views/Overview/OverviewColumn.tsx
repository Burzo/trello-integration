import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import { Error } from '../../helpers/Error/Error'
import CompanyCard from '../../helpers/SimpleCard/CompanyCard'
import './style.scss'
import { Card } from '../../../store/cards/types'

interface IProps {
  company: string
  column: string
  cards?: Card[]
}

function OverviewColumn({ company, column, cards = [] }: IProps) {
  if (cards.length <= 0 && company !== '') {
    return (
      <Error>
        {`Ne najdem podatkov za ${company}. Preveri Trello, če obstaja stolpec ${column}.`}
      </Error>
    )
  }

  if (cards.length <= 0) {
    return null
  }

  return (
    <div className="text-center">
      <Typography display="inline" variant="h6">
        {column}
      </Typography>
      <Divider style={{ marginBottom: '1rem', marginTop: '0.5rem' }} />
      <div className="overview-column">
        {cards.map((card: Card) => (
          <CompanyCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}

export default OverviewColumn
