import React from 'react'
import { Grid } from '@material-ui/core'
import SelectCompany from '../Paychecks/SelectCompany'
import CompanyOverview from './CompanyOverview'
import { putCurrentCompany } from '../../../store/company/actions'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../store'
import { setCurrentCompany } from '../../../store/company/types'
import { connect } from 'react-redux'
import { filterOutEmptyOverviewkBoards } from '../../../helpers'
import { IBoards } from '../../../store/boards/types'

interface IProps {
  putCurrentCompany: (company: string) => void
  boards: IBoards
}

const Overview = ({ putCurrentCompany, boards }: IProps) => {
  const handleCompanyChange = (company: string) => {
    putCurrentCompany(company)
  }

  return (
    <div className="home">
      <Grid className="layout" container spacing={3}>
        <Grid className="layout-columns" item xs={3}>
          <SelectCompany
            boards={boards.boards}
            filter="overview"
            setCompany={handleCompanyChange}
          />
        </Grid>
        <Grid className="layout-columns" item xs={9}>
          <CompanyOverview />
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  const filteredBoards = filterOutEmptyOverviewkBoards(
    store.boards.boards,
    store.lists.lists,
  )

  return {
    boards: { ...store.boards, boards: filteredBoards },
    company: store.company,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, any, setCurrentCompany>,
) => {
  return {
    putCurrentCompany: (company: string) =>
      dispatch(putCurrentCompany(company)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
