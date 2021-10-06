import React, { useEffect, FC, useRef } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../store'
import { AllBoardsTypes } from '../../store/boards/types'
import { UpdateCardTypes } from '../../store/cards/types'
import './style.scss'
import Header from '../helpers/Header/Header'
import Router from '../helpers/Router/Router'
import { fetchAll } from '../../store/allData/actions'

interface IProps {
  token: string
  fetchAll: (token: string) => void
}

const FETCH_INTERVAL = 1000 * 60 * 5

const MainView: FC<IProps> = ({ token, fetchAll }) => {
  let fetchingInterval: React.MutableRefObject<number | null | undefined> =
    useRef()

  useEffect(() => {
    fetchAll(token)
    if (fetchingInterval.current !== null) {
      clearInterval(fetchingInterval.current)
    }
    fetchingInterval.current = window.setInterval(() => {
      // fetchAll(token)
    }, FETCH_INTERVAL)

    return () => {
      clearInterval(fetchingInterval.current as number)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Header>
      {(className) => {
        return (
          <div className={className}>
            <Router />
          </div>
        )
      }}
    </Header>
  )
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, any, AllBoardsTypes | UpdateCardTypes>,
) => {
  return {
    fetchAll: (token: string) => dispatch(fetchAll(token)),
  }
}

export default connect(() => ({}), mapDispatchToProps)(MainView)
