import React, { FunctionComponent, useState, ReactNode, useEffect } from 'react'
import { sortBoards } from '../../../helpers'
import { FormControl, TextField, Divider } from '@material-ui/core'
import { IBoard } from '../../../store/boards/types'

interface IProps {
  boards: IBoard[]
  render: (filteredBoards: IBoard[]) => ReactNode
  children?: (filteredBoards: IBoard[]) => false | JSX.Element
  className?: string
}

export const Filter: FunctionComponent<IProps> = ({
  boards,
  render,
  children,
  className,
}) => {
  const [filteredBoards, setFilteredBoards] = useState<IBoard[]>([])
  const [filterInput, setFilterInput] = useState('')

  useEffect(() => {
    handleFilterChange(filterInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards])

  const handleFilterChange = (e: string) => {
    setFilterInput(e)
    e = e.toLowerCase()
    if (e === '') {
      setFilteredBoards(boards)
    } else {
      const fboards = boards.filter((board: IBoard) => {
        if (board.name.toLowerCase().includes(e)) {
          return true
        }
        return false
      })
      setFilteredBoards(fboards)
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
      {children && children(filteredBoards)}
      <Divider style={{ marginBottom: '1rem', marginTop: '0.5rem' }} />
      <div className="boards-container">
        {render(sortBoards(filteredBoards) as IBoard[])}
      </div>
    </React.Fragment>
  )
}
