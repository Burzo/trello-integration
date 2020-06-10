import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Card as MyCard } from '../../store/cards/types'

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
  updateCard: (query: string) => void
}

export default function SimpleCard({ updateCard, card }: IProps) {
  const classes = useStyles()

  const buttonPress = () => {
    updateCard('desc=REMZOOOOOOOOOOOO')
  }

  let date = card.due
    ? new Date(card.due).toLocaleDateString()
    : 'No date available'

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          BOARD: {card.id}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          BOARD: {card.idBoard}
        </Typography>
        <Typography variant="h5" component="h2">
          DESC: {card.desc}
        </Typography>
        <Typography variant="h5" component="h2">
          LIST: {card.idList}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          NAME: {card.name}
        </Typography>
        <Typography variant="body2" component="p">
          {date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={buttonPress} size="small">
          Change desc to REMZO
        </Button>
      </CardActions>
    </Card>
  )
}
