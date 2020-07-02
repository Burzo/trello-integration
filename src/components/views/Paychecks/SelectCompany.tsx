import React, { FC } from 'react'
import FormControl from '@material-ui/core/FormControl'
import { IBoards, IBoard } from '../../../store/boards/types'
import { RootState } from '../../../store'
import { connect } from 'react-redux'
import { Pagination } from '@material-ui/lab'
import { Filter } from '../../helpers/Filter/BoardFilter'
import SmallCompanyCard from '../../helpers/SimpleCard/SmallCompanyCard'
import { Card } from '../../../store/cards/types'
import { Lists, List } from '../../../store/lists/types'

const ITEMS_PER_PAGE: number = 18

export type IFilters = 'paycheck' | 'overview'

interface IProps {
  boards: IBoards
  company: string
  changeSmallCompanyColor?: boolean
  cards?: Card[]
  lists?: List[]
  filter: IFilters
  setCompany: (company: string) => void
}

const SelectCompany: FC<IProps> = ({
  boards,
  changeSmallCompanyColor,
  company = '',
  setCompany,
  filter,
  lists = [],
  cards = [],
}) => {
  const [page, setPage] = React.useState(1)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  const handleSelectChange = (board: IBoard) => {
    setCompany(board.name)
  }

  return (
    <FormControl style={{ width: '100%' }} component="fieldset">
      <Filter
        lists={lists}
        filter={filter}
        render={(filteredBoards) => {
          if (filteredBoards.length <= 0) {
            return <div>Ne najdem podjetij.</div>
          }
          return filteredBoards.map((board: IBoard, index) => {
            let lowerLimit = page * ITEMS_PER_PAGE - ITEMS_PER_PAGE
            let higherLimit = page * ITEMS_PER_PAGE
            if (index >= lowerLimit && index < higherLimit) {
              return (
                <SmallCompanyCard
                  board={board}
                  changeColor={changeSmallCompanyColor}
                  handleSelectChange={handleSelectChange}
                />
              )
            }
            return null
          })
        }}
        boards={boards.boards}
      >
        {(filteredBoards) => (
          <Pagination
            count={Math.floor(filteredBoards.length / ITEMS_PER_PAGE) + 1}
            page={page}
            onChange={handlePageChange}
            color="primary"
            classes={{ ul: 'center' }}
          />
        )}
      </Filter>
    </FormControl>
  )
}

const mapStateToProps = (store: RootState) => {
  return {
    lists: store.lists.lists,
    boards: store.boards,
    company: store.company,
  }
}

export default connect(mapStateToProps)(SelectCompany)
