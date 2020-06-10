import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Card as MyCard, UpdateCardTypes } from '../../../store/cards/types'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../store'
import { updateCard } from '../../../store/cards/actions'
import { connect } from 'react-redux'
import { getTrelloToken } from '../../../helpers'
import './style.scss'
import DoneIcon from '@material-ui/icons/Done'
import { CSSTransition } from 'react-transition-group'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

interface IProps {
  card: MyCard
  className?: string
  updateCard?: (token: string, card: MyCard, query: string) => void
}

const SimpleCard = ({ updateCard, card, className = '' }: IProps) => {
  const [animate, setAnimate] = useState(false)

  const buttonPress = () => {
    updateCard && updateCard(getTrelloToken(), card, 'dueComplete=true')
    setAnimate(false)
  }

  useEffect(() => {
    setAnimate(true)
  }, [])

  let date = card.due
    ? new Date(card.due).toLocaleDateString()
    : 'No date available'

  return (
    <CSSTransition in={animate} timeout={300} classNames="alert" unmountOnExit>
      <div className="simplecard">
        <div className={'card text-dark bg-light mb-3 ' + className}>
          <div className="card-header">{card.idBoard}</div>
          <div className="card-body">
            <h5 className="card-title">{card.name}</h5>
            <p className="card-text">{card.desc}</p>
            <p className="card-text">Expires: {date}</p>
          </div>
        </div>
        <DoneIcon onClick={buttonPress} className="simplecard__icon" />
      </div>
    </CSSTransition>
  )
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, any, UpdateCardTypes>,
) => {
  return {
    updateCard: (token: string, card: MyCard, query: string) =>
      dispatch(updateCard(token, card, query)),
  }
}

export default connect(null, mapDispatchToProps)(SimpleCard)
