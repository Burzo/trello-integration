import React from 'react'
import { Grid } from '@material-ui/core'
import SelectCompany from './SelectCompany'
import Company from './Company'
import { putCurrentCompany } from '../../../store/company/actions'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../store'
import { setCurrentCompany } from '../../../store/company/types'
import { connect } from 'react-redux'
import { IBoard } from '../../../store/boards/types'

interface IProps {
  putCurrentCompany: (company: string) => void
  boards: IBoard[]
}

const Paychecks = ({ putCurrentCompany, boards }: IProps) => {
  const handleCompanyChange = (company: string) => {
    putCurrentCompany(company)
  }

  return (
    <div className="home">
      <Grid className="layout" container spacing={3}>
        <Grid className="layout-columns" item xs={3}>
          <SelectCompany
            boards={boards}
            filter="paycheck"
            setCompany={handleCompanyChange}
          />
        </Grid>
        <Grid className="layout-columns" item xs={9}>
          <Company />
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  return {
    boards: store.boards.boards,
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

export default connect(mapStateToProps, mapDispatchToProps)(Paychecks)
