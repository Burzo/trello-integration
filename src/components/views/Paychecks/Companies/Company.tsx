import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import { Error } from '../../../helpers/Error/Error'
import CompanyCard from '../../../helpers/SimpleCard/CompanyCard'
import './style.scss'
import { RootState } from '../../../../store'
import { Card } from '../../../../store/cards/types'
import {
  getOutPaycheck,
  remapListIdCards,
  remapBoardIdCards,
} from '../../../../helpers'
import { connect } from 'react-redux'

interface IProps {
  company: string
  cards?: Card[]
}

function Company({ company, cards = [] }: IProps) {
  const isolateCompany = () => {
    return cards.filter((card: Card) => {
      return card.idBoard.toLowerCase() === company.toLowerCase()
    })
  }

  if (company && cards.length <= 0) {
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
      {isolateCompany().length !== 0 && (
        <Typography display="inline" variant="body1">
          &nbsp;(skupno {isolateCompany().length} zaposlenih.)
        </Typography>
      )}
      <Divider style={{ marginBottom: '1rem', marginTop: '0.5rem' }} />
      <div className="companies">
        {cards.map((card: Card) => {
          if (card.idBoard.toLowerCase() === company.toLowerCase()) {
            return <CompanyCard key={card.id} card={card} />
          }
          return null
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  const filteredCards = store.cards.cards.filter(
    (card: Card) => card.dueComplete === false,
  )
  return {
    cards: getOutPaycheck(
      remapListIdCards(
        store.lists.lists,
        remapBoardIdCards(store.boards.boards, filteredCards),
      ),
    ),
  }
}

export default connect(mapStateToProps)(Company)
