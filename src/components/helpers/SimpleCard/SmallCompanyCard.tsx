import React, { useState, useEffect } from 'react'
import './style.scss'
import { CSSTransition } from 'react-transition-group'
import { Card, Typography } from '@material-ui/core'
import { IBoard } from '../../../store/boards/types'

interface IProps {
  board: IBoard
  className?: string
  company: string
  handleSelectChange: (board: IBoard) => void
}

const SmallCompanyCard = ({
  handleSelectChange,
  board,
  company,
  className = '',
}: IProps) => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const isClicked = () => {
    if (board.name === company) {
      return 'smallcompanycard selected MuiAppBar-colorPrimary'
    }
    return 'smallcompanycard'
  }

  return (
    <div>
      <CSSTransition
        in={animate}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <Card
          onClick={() => handleSelectChange(board)}
          key={board.id}
          elevation={3}
          className={isClicked()}
        >
          <div className="container">
            <Typography variant="h6">{board.name}</Typography>
          </div>
        </Card>
      </CSSTransition>
    </div>
  )
}

export default SmallCompanyCard
