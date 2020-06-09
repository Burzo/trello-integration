import React from 'react'
import { Route, Switch } from 'react-router-dom'
import useTrelloClient from './hooks/useTrelloClient'
import HomeView from './views/HomeView'

// Main entry point for the whole application. Everything is loaded up here.
const TrelloIntegration = () => {
  const [token, error] = useTrelloClient(process.env.REACT_APP_TRELLO_API_KEY)

  if (error) {
    return <h1>Error when loading up the app...</h1>
  }

  if (token) {
    return (
      <Switch>
        <Route path="/" component={() => <HomeView token={token} />} />
      </Switch>
    )
  }

  return <h1>Loading Trello API Client...</h1>
}

export default TrelloIntegration
