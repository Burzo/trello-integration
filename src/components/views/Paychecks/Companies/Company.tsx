import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import { Card } from '../../../../store/cards/types'
import { Error } from '../../../helpers/Error/Error'
import CompanyCard from '../../../helpers/SimpleCard/CompanyCard'
import './style.scss'

interface IProps {
  company: string
  data: Card[]
}

export default function Company({ company, data }: IProps) {
  if (company && data.length <= 0) {
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
      {data.length !== 0 && (
        <Typography display="inline" variant="body1">
          &nbsp;(skupno {data.length} zaposlenih.)
        </Typography>
      )}
      <Divider style={{ marginBottom: '1rem', marginTop: '0.5rem' }} />
      <div className="companies">
        {data.map((card: Card) => (
          <CompanyCard card={card} />
        ))}
      </div>
    </div>
  )
}
