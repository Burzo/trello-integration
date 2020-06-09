import React, { useEffect, FC } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../store'
import { AllBoardsTypes } from '../../store/boards/types'
import { fetchBoards } from '../../store/boards/actions'
import { fetchCardsForOneBoard } from '../../store/cards/actions'

interface IProps {
  token: string
  fetchBoards: (token: string) => void
  fetchCardsForOneBoard: (token: string) => void
}

const HomeView: FC<IProps> = ({
  token,
  fetchBoards,
  fetchCardsForOneBoard,
}) => {
  useEffect(() => {
    fetchBoards(token)
    fetchCardsForOneBoard(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <h1>test</h1>
}

const mapStateToProps = (store: RootState) => {
  return {
    boards: store.boards,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, any, AllBoardsTypes>,
) => {
  return {
    fetchBoards: (token: string) => dispatch(fetchBoards(token)),
    fetchCardsForOneBoard: (token: string) =>
      dispatch(fetchCardsForOneBoard(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
