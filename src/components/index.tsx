import React from 'react'
import { Route, Switch } from 'react-router-dom'
import useTrelloClient from './hooks/useTrelloClient'
import HomeView from './views/HomeView'
import { Loading } from './helpers/Loading/Loading'

// Main entry point for the whole application. Everything is loaded up here.
const TrelloIntegration = () => {
  const [token, error, logout] = useTrelloClient(
    process.env.REACT_APP_TRELLO_API_KEY,
  )

  if (error) {
    return <h1>{error}</h1>
  }

  if (token) {
    return (
      <Switch>
        <Route path="/" component={() => <HomeView token={token} />} />
      </Switch>
    )
  }

  return (
    <div className="container-fluid fixed-middle">
      <Loading />
    </div>
  )
}

export default TrelloIntegration
