import React, { useState, useEffect, CSSProperties } from 'react'
import './style.scss'
import { CSSTransition } from 'react-transition-group'
import { Card, Typography } from '@material-ui/core'
import { IBoard } from '../../../store/boards/types'
import { RootState } from '../../../store'
import {
  calculateBilancePercantage,
  getOutCompanyBilance,
  NEW_calculateBilancePercantage,
} from '../../../helpers'
import { connect } from 'react-redux'
import { IAllDataCompany } from '../../../store/allData/types'

interface IProps {
  board: IBoard
  className?: string
  companies: IAllDataCompany[]
  selectedCompany?: string
  handleSelectChange: (board: IBoard) => void
}

const SmallCompanyCardBilance = ({
  handleSelectChange,
  board,
  companies,
  selectedCompany,
  className = '',
}: IProps) => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const index = companies.findIndex((company) => company.name === board.name)

  if (index < 0) return null

  const company = companies[index]
  const cards = getOutCompanyBilance(company)

  const isClicked = () => {
    if (selectedCompany === company.name) {
      return 'smallcompanycard selected'
    }
    return 'smallcompanycard'
  }

  const { percentage, green } = NEW_calculateBilancePercantage(cards)

  return (
    <div className={className}>
      <CSSTransition
        in={animate}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <Card
          style={{ backgroundColor: 'transparent' }}
          onClick={() => handleSelectChange(board)}
          key={board.id}
          className={isClicked()}
        >
          <div className="container">
            <Typography className="smallcompanycard-text" variant="h6">
              {board.name}
            </Typography>
          </div>
          <Fill percentage={percentage} green={green} />
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

export default connect(mapStateToProps)(SmallCompanyCardBilance)

interface FillProps {
  percentage: number
  green: boolean
}

// Fills up its parent
const Fill = ({ percentage, green }: FillProps) => {
  const [loadup, setLoadup] = useState(false)
  const [problem, setProblem] = useState(false)

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
    backgroundColor: '#003f64',
    transition: 'all 1s',
    zIndex: -100,
  }

  const backgroundStyle: CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundColor: green ? '#4caf50' : 'white',
    height: '100%',
    width: '100%',
    zIndex: -110,
  }

  useEffect(() => {
    setLoadup(true)
    problem && setProblem(false)

    if (percentage === 100 && !green) {
      setProblem(true)
    }
  }, [percentage, green])

  return (
    <React.Fragment>
      <span style={loadup ? animatedStyle : style}>&nbsp;</span>
      <span style={backgroundStyle}>&nbsp;</span>
      {problem && (
        <Typography
          style={{ color: 'red', outline: 'white', textAlign: 'center' }}
        >
          Bilanca ni izpolnjena!
        </Typography>
      )}
    </React.Fragment>
  )
}
