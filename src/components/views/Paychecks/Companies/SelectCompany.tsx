import React, { FC } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { IBoards, IBoard } from '../../../../store/boards/types'
import { RootState } from '../../../../store'
import { connect } from 'react-redux'
import { Pagination } from '@material-ui/lab'
import { Filter } from '../../../helpers/Filter/BoardFilter'
import { Error } from '../../../helpers/Error/Error'
import { Loading } from '../../../helpers/Loading/Loading'
import { Typography } from '@material-ui/core'

const ITEMS_PER_PAGE: number = 14

interface IProps {
  boards: IBoards
  company: string
  setCompany: React.Dispatch<React.SetStateAction<string>>
}

const SelectCompany: FC<IProps> = ({ boards, company, setCompany }) => {
  const [page, setPage] = React.useState(1)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(event.target.value)
  }

  return (
    <FormControl style={{ width: '100%' }} component="fieldset">
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={company}
        onChange={handleSelectChange}
      >
        <Filter
          render={(filteredBoards) => {
            if (filteredBoards.length <= 0) {
              return <div>Ne najdem podjetij.</div>
            }
            return filteredBoards.map((board: IBoard, index) => {
              let lowerLimit = page * ITEMS_PER_PAGE - ITEMS_PER_PAGE
              let higherLimit = page * ITEMS_PER_PAGE
              if (index >= lowerLimit && index < higherLimit) {
                return (
                  <FormControlLabel
                    value={board.name}
                    control={
                      <Radio
                        style={{ fontSize: '1rem' }}
                        color="primary"
                        icon={<Typography>{board.name}</Typography>}
                        checkedIcon={<Typography>{board.name}</Typography>}
                      />
                    }
                    label={null}
                  />
                )
              }
              return null
            })
          }}
          boards={boards.boards}
        >
          {(filteredBoards) =>
            filteredBoards.length > ITEMS_PER_PAGE && (
              <Pagination
                count={Math.floor(boards.boards.length / ITEMS_PER_PAGE) + 1}
                page={page}
                onChange={handlePageChange}
                color="primary"
                classes={{ ul: 'center' }}
              />
            )
          }
        </Filter>
      </RadioGroup>
    </FormControl>
  )
}

const mapStateToProps = (store: RootState) => {
  return {
    boards: store.boards,
  }
}

export default connect(mapStateToProps)(SelectCompany)
