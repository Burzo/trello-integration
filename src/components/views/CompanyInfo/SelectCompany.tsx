import React, { FC } from 'react'
import FormControl from '@material-ui/core/FormControl'
import { IBoard } from '../../../store/boards/types'
import { Pagination } from '@material-ui/lab'
import Filter from '../../helpers/Filter/BoardFilter'
import SmallCompanyCardPodjetje from '../../helpers/SimpleCard/SmallCompanyCardPodjetje'

const ITEMS_PER_PAGE: number = 18

export type IFilters = 'paycheck' | 'overview' | 'bilance'

interface IProps {
  boards: IBoard[]
  filter: IFilters
  noFilter?: boolean
  outerClassName?: string
  className?: string
  setCompany: (company: string) => void
}

const SelectCompany: FC<IProps> = ({
  boards,
  setCompany,
  filter,
  noFilter,
  outerClassName,
  className,
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

  if (noFilter) {
    return (
      <Filter filter={filter} boards={boards}>
        {(filteredBoards) => {
          if (filteredBoards.length <= 0) {
            return <div>Ne najdem podjetij.</div>
          }
          return (
            <div className={outerClassName}>
              {filteredBoards.map((board: IBoard) => {
                return (
                  <SmallCompanyCardPodjetje
                    className={className}
                    board={board}
                    filter={filter}
                    handleSelectChange={handleSelectChange}
                  />
                )
              })}
            </div>
          )
        }}
      </Filter>
    )
  }

  return (
    <FormControl
      style={{ width: '100%' }}
      component="fieldset"
      className={outerClassName}
    >
      <Filter
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
                <SmallCompanyCardPodjetje
                  board={board}
                  filter={filter}
                  handleSelectChange={handleSelectChange}
                />
              )
            }
            return null
          })
        }}
        boards={boards}
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

export default SelectCompany
