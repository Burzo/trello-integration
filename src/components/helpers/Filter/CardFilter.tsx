import React, { FunctionComponent, useState, ReactNode, useEffect } from 'react'
import { Card } from '../../../store/cards/types'
import { sort } from '../../../helpers'
import { FormControl, TextField, Divider } from '@material-ui/core'

interface IProps {
  cards: Card[]
  render: (filteredCards: Card[]) => ReactNode
  children?: (filteredCards: Card[]) => false | JSX.Element
  className?: string
}

export const Filter: FunctionComponent<IProps> = ({
  cards,
  render,
  children,
  className,
}) => {
  const [filteredCards, setFilteredCards] = useState<Card[]>([])
  const [filterInput, setFilterInput] = useState('')

  useEffect(() => {
    handleFilterChange(filterInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards])

  const handleFilterChange = (e: string) => {
    setFilterInput(e)
    e = e.toLowerCase().trim()
    if (e === '') {
      setFilteredCards(cards)
    } else {
      const fcards = cards.filter((card: Card) => {
        if (card.idBoard.toLowerCase().trim().includes(e)) {
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
      <div className="center" style={{ marginBottom: '0.5rem' }}>
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
      {children && children(filteredCards)}
      <Divider style={{ marginBottom: '1rem', marginTop: '0.5rem' }} />
      <div
        className={
          className === 'danger'
            ? 'cards-container one-line'
            : 'cards-container'
        }
      >
        {render(sort(filteredCards) as Card[])}
      </div>
    </React.Fragment>
  )
}
