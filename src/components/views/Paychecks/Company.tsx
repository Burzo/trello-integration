import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import { Error } from '../../helpers/Error/Error'
import CompanyCard from '../../helpers/SimpleCard/CompanyCard'
import './style.scss'
import { RootState } from '../../../store'
import { Card } from '../../../store/cards/types'
import {
  getOutPaycheck,
  remapListIdCards,
  remapBoardIdCards,
} from '../../../helpers'
import { connect } from 'react-redux'

interface IProps {
  company: string
  cards?: Card[]
}

function Company({ company, cards = [] }: IProps) {
  if (cards.length <= 0 && company !== '') {
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
  const filteredCards = store.cards.cards.filter(
    (card: Card) =>
      card.dueComplete === false &&
      card.idBoard.toLowerCase().trim() === store.company.toLowerCase().trim(),
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
