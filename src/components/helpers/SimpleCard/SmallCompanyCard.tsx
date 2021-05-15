import React, { useState, useEffect, CSSProperties } from 'react'
import './style.scss'
import { CSSTransition } from 'react-transition-group'
import { Card, Typography } from '@material-ui/core'
import { IBoard } from '../../../store/boards/types'
import { RootState } from '../../../store'
import {
  calculatePercantage,
  getOutCompanyOverviewAndBilance,
  calculateBilancePercantage,
} from '../../../helpers'
import { connect } from 'react-redux'
import { IFilters } from '../../views/Paychecks/SelectCompany'
import { IAllDataCompany } from '../../../store/allData/types'

interface IProps {
  board: IBoard
  className?: string
  companies: IAllDataCompany[]
  selectedCompany?: string
  handleSelectChange: (board: IBoard) => void
  filter: IFilters
}

const SmallCompanyCard = ({
  handleSelectChange,
  board,
  companies,
  selectedCompany,
  className = '',
  filter,
}: IProps) => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const index = companies.findIndex((company) => company.name === board.name)

  if (index < 0) return null

  const company = companies[index]

  const cards = getOutCompanyOverviewAndBilance(company)

  const isClicked = () => {
    if (selectedCompany === company.name) {
      switch (filter) {
        case 'paycheck':
          return 'smallcompanycard selected MuiAppBar-colorPrimary'
        case 'bilance':
          return 'smallcompanycard selected'
        default:
          return 'smallcompanycard selected'
      }
    }
    return 'smallcompanycard'
  }

  const getFontClassName = () => {
    switch (filter) {
      case 'overview':
        return 'smallcompanycard-text'
      case 'bilance':
        return 'smallcompanycard-text'
      default:
        return ''
    }
  }

  const percentage: number =
    filter === 'overview'
      ? calculatePercantage(cards)
      : calculateBilancePercantage(cards)

  return (
    <div>
      <CSSTransition
        in={animate}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <Card
          style={
            filter === 'paycheck'
              ? undefined
              : { backgroundColor: 'transparent' }
          }
          onClick={() => handleSelectChange(board)}
          key={board.id}
          className={isClicked()}
        >
          <div className="container">
            <Typography className={getFontClassName()} variant="h6">
              {board.name}&nbsp;
              {filter === 'overview' && `(${percentage.toFixed(0)}%)`}
            </Typography>
          </div>
          {filter !== 'paycheck' && <Fill percentage={percentage} />}
        </Card>
      </CSSTransition>
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  return {
    companies: store.allData.companies,
    selectedCompany: store.company,
  }
}

export default connect(mapStateToProps)(SmallCompanyCard)

interface FillProps {
  percentage: number
}

// Fills up its parent
const Fill = ({ percentage }: FillProps) => {
  const [loadup, setLoadup] = useState(false)

  const style: CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: 0,
    backgroundColor: 'green',
    transition: 'all 1s',
    zIndex: 100,
  }

  const animatedStyle: CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: percentage > 100 ? '#003f64' : '#4caf50',
    transition: 'all 1s',
    zIndex: -100,
  }

  const backgroundStyle: CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    zIndex: -110,
  }

  useEffect(() => {
    setLoadup(true)
  }, [])

  return (
    <React.Fragment>
      <span style={loadup ? animatedStyle : style}>&nbsp;</span>
      <span style={backgroundStyle}>&nbsp;</span>
    </React.Fragment>
  )
}
