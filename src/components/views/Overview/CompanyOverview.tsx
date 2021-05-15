import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import { Error } from '../../helpers/Error/Error'
import './style.scss'
import { RootState } from '../../../store'
import { Card } from '../../../store/cards/types'
import { getOutListString } from '../../../helpers'
import { connect } from 'react-redux'
import OverviewColumn from './OverviewColumn'
import { IAllDataCompany } from '../../../store/allData/types'

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
  company?: IAllDataCompany
  cards?: CompanyOverview
}

function CompanyOverview({ company, cards = emptyState }: IProps) {
  if (!company || cards === emptyState) {
    return (
      <Error>
        {`Ne najdem podatkov za ${company}. Preveri Trello, če obstajajo stolpci IZDANI RAČUNI (PRIHODKI), PREJETI RAČUNI (ODHODKI), BANKA, DDV PLAČE OSTALO, PREGLED BRUTO BILANCE.`}
      </Error>
    )
  }

  return (
    <div className="text-center">
      <Typography display="inline" variant="h6">
        {company.name}
      </Typography>
      <Divider style={{ marginBottom: '1rem', marginTop: '0.5rem' }} />
      <div className="overview">
        <OverviewColumn
          company={company.name}
          column="Izdani računi (prihodki)"
          cards={cards.izdani}
        />
        <OverviewColumn
          company={company.name}
          column="Prejeti računi (odhodki)"
          cards={cards.prejeti}
        />
        <OverviewColumn
          company={company.name}
          column="Banka"
          cards={cards.bank}
        />
        <OverviewColumn
          company={company.name}
          column="DDV / Plače / Ostalo"
          cards={cards.rest}
        />
        <OverviewColumn
          company={company.name}
          column="Bilance"
          cards={cards.bilance}
        />
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

  const izdani = getOutListString(company, 'izdani računi (prihodki)')
  const prejeti = getOutListString(company, 'prejeti računi (odhodki)')
  const bank = getOutListString(company, 'banka')
  const rest = getOutListString(company, 'ddv plače ostalo')
  const bilance = getOutListString(company, 'pregled bruto bilance')

  return {
    cards: {
      izdani,
      prejeti,
      bank,
      rest,
      bilance,
    },
    company: company,
  }
}

export default connect(mapStateToProps)(CompanyOverview)
