import React, { FC } from 'react'
import { IBoard } from '../../../store/boards/types'
import Filter from '../../helpers/Filter/BoardFilter'
import SmallCompanyCardBilance from '../../helpers/SimpleCard/SmallCompanyCardBilance'

export type IFilters = 'paycheck' | 'overview' | 'bilance'

interface IProps {
  boards: IBoard[]
  filter: IFilters
  outerClassName?: string
  className?: string
  setCompany: (company: string) => void
}

const SelectCompany: FC<IProps> = ({
  boards,
  setCompany,
  filter,
  outerClassName,
  className,
}) => {
  const handleSelectChange = (board: IBoard) => {
    setCompany(board.name)
  }

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
                <SmallCompanyCardBilance
                  className={className}
                  board={board}
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

export default SelectCompany
