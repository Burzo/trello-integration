import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import { Error } from '../../helpers/Error/Error'
import { RootState } from '../../../store'
import { Card } from '../../../store/cards/types'
import {
  remapListIdCards,
  remapBoardIdCards,
  getOutBasicInfo,
} from '../../../helpers'
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
        {cards.map((card: Card) => {
          if (
            card.idBoard.toLowerCase().trim() === company.toLowerCase().trim()
          ) {
            return <PaycheckCard key={card.id} card={card} />
          }
          return null
        })}
        {company === '' ? null : <AddCompanyInfo />}
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
    cards: getOutBasicInfo(
      remapListIdCards(
        store.lists.lists,
        remapBoardIdCards(store.boards.boards, filteredCards),
      ),
    ),
    company: store.company,
  }
}

export default connect(mapStateToProps)(CompanyInfo)
