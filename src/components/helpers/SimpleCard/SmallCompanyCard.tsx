import React, { useState, useEffect, CSSProperties } from 'react'
import './style.scss'
import { CSSTransition } from 'react-transition-group'
import { Card, Typography } from '@material-ui/core'
import { IBoard } from '../../../store/boards/types'
import { RootState } from '../../../store'
import {
  remapBoardIdCards,
  remapListIdCards,
  getOutCompanyOverview,
  calculatePercantage,
} from '../../../helpers'
import { connect } from 'react-redux'
import { Card as MyCard } from '../../../store/cards/types'

interface IProps {
  board: IBoard
  cards: MyCard[]
  className?: string
  company: string
  changeColor?: boolean
  handleSelectChange: (board: IBoard) => void
}

const SmallCompanyCard = ({
  handleSelectChange,
  board,
  cards,
  company,
  className = '',
  changeColor,
}: IProps) => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const isClicked = () => {
    if (board.name === company) {
      if (changeColor) {
        return 'smallcompanycard selected MuiAppBar-colorPrimary'
      }
      return 'smallcompanycard selected'
    }
    return 'smallcompanycard'
  }

  const filterOutMyCards = (): MyCard[] => {
    return cards.filter((card: MyCard) => {
      return (
        card.idBoard.toLowerCase().trim() === board.name.toLowerCase().trim()
      )
    })
  }

  const percentage: number = calculatePercantage(filterOutMyCards())

  return (
    <div>
      <CSSTransition
        in={animate}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <Card
          style={changeColor ? undefined : { backgroundColor: 'transparent' }}
          onClick={() => handleSelectChange(board)}
          key={board.id}
          className={isClicked()}
        >
          <div className="container">
            <Typography
              className={changeColor ? '' : 'smallcompanycard-text'}
              variant="h6"
            >
              {board.name} ({percentage.toFixed(0)}% narejeno)
            </Typography>
          </div>
          {!changeColor && <Fill percentage={percentage} />}
        </Card>
      </CSSTransition>
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  const allCards = getOutCompanyOverview(
    remapListIdCards(
      store.lists.lists,
      remapBoardIdCards(store.boards.boards, store.cards.cards),
    ),
  )

  return {
    cards: allCards,
    company: store.company,
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
    backgroundColor: '#4caf50',
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
