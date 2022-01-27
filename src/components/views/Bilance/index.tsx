import React from 'react'
import { Grid, Modal } from '@material-ui/core'
import CompanyView from './CompanyView'
import { putCurrentCompany } from '../../../store/company/actions'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../store'
import { setCurrentCompany } from '../../../store/company/types'
import { connect } from 'react-redux'
import { IBoards } from '../../../store/boards/types'
import SelectCompany from './SelectCompany'

interface IProps {
  putCurrentCompany: (company: string) => void
  boards: IBoards
}

const Bilance = ({ putCurrentCompany, boards }: IProps) => {
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
      <Grid className="layout">
        <SelectCompany
          outerClassName="item-layout"
          className="item"
          boards={boards.boards}
          filter="bilance"
          setCompany={handleCompanyChange}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Grid className="layout-columns modal-body" item xs={9}>
            <CompanyView />
          </Grid>
        </Modal>
      </Grid>
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  return {
    boards: store.boards,
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

export default connect(mapStateToProps, mapDispatchToProps)(Bilance)
