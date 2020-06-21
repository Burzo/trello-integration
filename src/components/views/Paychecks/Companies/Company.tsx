import React from 'react'
import { Typography } from '@material-ui/core'
import { Card } from '../../../../store/cards/types'
import { Error } from '../../../helpers/Error/Error'

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
      <Typography>{company}</Typography>
      {data.map((card: Card) => (
        <div>{card.name}</div>
      ))}
    </div>
  )
}
