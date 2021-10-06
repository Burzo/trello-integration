import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import { Error } from '../../helpers/Error/Error'
import './style.scss'
import { RootState } from '../../../store'
import { Card } from '../../../store/cards/types'
import { getOutListString } from '../../../helpers'
import { connect } from 'react-redux'
import PaycheckCard from '../../helpers/SimpleCard/PaycheckCard'

interface IProps {
  company: string
  cards?: Card[]
}

function Company({ company, cards = [] }: IProps) {
  if (!company) return null
  if (cards.length === 0) {
    return (
      <Error>
        {`Ne najdem plač za ${company}. Preveri Trello, če obstaja stolpec "Plače".`}
      </Error>
    )
  }

  return (
    <div className="text-center">
      <Typography display="inline" variant="h6">
        {company}
      </Typography>
      {cards.length !== 0 && (
        <Typography display="inline" variant="body1">
          &nbsp;(skupno {cards.length} zaposlenih.)
        </Typography>
      )}
      <Divider style={{ marginBottom: '1rem', marginTop: '0.5rem' }} />
      <div className="companies">
        {cards.map((card: Card) => (
          <PaycheckCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  const company = store.allData.companies.filter((company) => {
    return (
      company.name.toLowerCase().trim() === store.company.toLowerCase().trim()
    )
  })[0]

  const cards = getOutListString(company, 'plače', false, true)

  return {
    cards,
    company: store.company,
  }
}

export default connect(mapStateToProps)(Company)
