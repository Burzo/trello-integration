import React from 'react'
import useTrelloClient from './hooks/useTrelloClient'
import { Loading } from './helpers/Loading/Loading'
import MainView from './views/MainView'

/**
 * App takes care of the trello login only
 */
const TrelloIntegration = () => {
  const [token, error] = useTrelloClient(process.env.REACT_APP_TRELLO_API_KEY)

  if (error) return <h1>{error}</h1>

  if (token) return <MainView token={token} />

  return (
    <div className="container-fluid fixed-middle">
      <Loading />
    </div>
  )
}

export default TrelloIntegration
