import React from 'react'
import { Grid, Modal } from '@material-ui/core'
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
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCompanyChange = (company: string) => {
    putCurrentCompany(company)
    handleOpen()
  }

  return (
    <div className="home">
      <div className="layout">
        <SelectCompany
          outerClassName="item-layout"
          className="item"
          noFilter
          boards={boards.boards}
          filter="overview"
          setCompany={handleCompanyChange}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Grid className="layout-columns modal-body" item xs={9}>
            <CompanyOverview />
          </Grid>
        </Modal>
      </div>
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
