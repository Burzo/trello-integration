import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import { Error } from '../../helpers/Error/Error'
import './style.scss'
import { RootState } from '../../../store'
import { Card } from '../../../store/cards/types'
import { getOutListString } from '../../../helpers'
import { connect } from 'react-redux'
import moment from 'moment'
import CompanyCard from '../../helpers/SimpleCard/CompanyCard'

interface IProps {
  company: string
  cards?: Card[]
}

function CompanyView({ company, cards = [] }: IProps) {
  if (!company || !cards || cards.length < 1) {
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
          return <CompanyCard key={card.id} card={card} />
        })}
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
  const bilance = getOutListString(company, `bilance ${moment().year()}`)

  return {
    cards: bilance,
    company: store.company,
  }
}

export default connect(mapStateToProps)(CompanyView)
