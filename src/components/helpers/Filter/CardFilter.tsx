import React, { FunctionComponent, useState, ReactNode, useEffect } from 'react'
import { Card } from '../../../store/cards/types'
import { sort } from './../../../helpers'
import { FormControl, TextField, Divider } from '@material-ui/core'

interface IProps {
  cards: Card[]
  render: (filteredCards: Card[]) => ReactNode
  children?: (filteredCards: Card[]) => false | JSX.Element
}

export const CardFilter: FunctionComponent<IProps> = ({
  cards,
  render,
  children,
}) => {
  const [filteredCards, setFilteredCards] = useState<Card[]>([])
  const [filterInput, setFilterInput] = useState('')

  useEffect(() => {
    handleFilterChange(filterInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, render])

  const handleFilterChange = (e: string) => {
    setFilterInput(e)
    e = e.toLowerCase()
    if (e === '') {
      setFilteredCards(cards)
    } else {
      const fcards = cards.filter((card: Card) => {
        if (card.idBoard.toLowerCase().includes(e)) {
          return true
        }
        return false
      })
      setFilteredCards(fcards)
    }
    return null
  }

  return (
    <React.Fragment>
      {children && children(filteredCards)}
      <div className="center">
        <FormControl style={{ width: '70%' }}>
          <TextField
            className="mb-2"
            value={filterInput}
            onChange={(e) => handleFilterChange(e.target.value)}
            fullWidth
            label="Filtriraj po podjetjih"
          />
        </FormControl>
      </div>
      <Divider style={{ marginBottom: '1rem', marginTop: '0.5rem' }} />
      <div className="cards-container">
        {render(sort(filteredCards) as Card[])}
      </div>
    </React.Fragment>
  )
}
