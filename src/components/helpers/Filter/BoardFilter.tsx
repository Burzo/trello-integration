import React, { FunctionComponent, useState, ReactNode, useEffect } from 'react'
import { sortBoards } from '../../../helpers'
import { FormControl, TextField, Divider } from '@material-ui/core'
import { IBoard } from '../../../store/boards/types'
import { IFilters } from '../../views/Paychecks/SelectCompany'
import { connect } from 'react-redux'
import { RootState } from '../../../store'
import { Lists } from '../../../store/lists/types'

interface IProps {
  boards: IBoard[]
  render: (filteredBoards: IBoard[]) => ReactNode
  children?: (filteredBoards: IBoard[]) => false | JSX.Element
  className?: string
  lists: Lists
  filter: IFilters
}

const Filter: FunctionComponent<IProps> = ({
  boards,
  render,
  children,
  filter,
  className,
  lists,
}) => {
  const [filteredBoards, setFilteredBoards] = useState<IBoard[]>([])
  const [filterInput, setFilterInput] = useState('')

  useEffect(() => {
    handleFilterChange(filterInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards])

  const handleFilterChange = (e: string) => {
    setFilterInput(e)
    e = e.toLowerCase().trim()
    if (e === '') {
      // If board empty don't show it
      setFilteredBoards(boards)
    } else {
      const fboards = boards.filter((board: IBoard) => {
        if (board.name.toLowerCase().trim().includes(e)) {
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

const mapStateToProps = (store: RootState) => {
  return {
    lists: store.lists,
  }
}

export default connect(mapStateToProps)(Filter)
