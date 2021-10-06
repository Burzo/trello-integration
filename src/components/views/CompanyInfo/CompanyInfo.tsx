import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import { Error } from '../../helpers/Error/Error'
import { RootState } from '../../../store'
import { Card } from '../../../store/cards/types'
import { getOutListString } from '../../../helpers'
import { connect } from 'react-redux'
import PaycheckCard from '../../helpers/SimpleCard/PaycheckCard'
import AddCompanyInfo from './AddCompanyInfo'

interface IProps {
  company: string
  cards?: Card[]
}

function CompanyInfo({ company, cards = [] }: IProps) {
  if (cards.length <= 0 && company !== '') {
    return (
      <Error>
        {`Ne najdem informacij o podjetju ${company}. Preveri Trello, če obstaja stolpec "Osnovni Podatki".`}
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
        {cards.map((card: Card) => (
          <PaycheckCard key={card.id} card={card} />
        ))}
        {company === '' ? null : <AddCompanyInfo />}
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

  const cards = getOutListString(company, 'osnovni podatki', false, true)

  return {
    cards,
    company: store.company,
  }
}

export default connect(mapStateToProps)(CompanyInfo)
