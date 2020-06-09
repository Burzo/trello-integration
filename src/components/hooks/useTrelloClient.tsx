import { useState, useEffect } from 'react'

declare global {
  interface Window {
    Trello: any
  }
}

const useTrelloClient: (
  apiKey: string | undefined,
) => [string | null, string | null] = (apiKey) => {
  const [jqueryLoaded, setJqueryLoaded] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.id = 'jquery'
    script.src = `https://code.jquery.com/jquery-3.5.1.min.js`
    script.async = true
    script.onload = () => {
      setJqueryLoaded(true)
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    const script = document.createElement('script')
    script.id = 'trello-client'
    script.src = `https://trello.com/1/client.js?key=${apiKey}`
    script.async = true
    script.onload = () => {
      GetToken()
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jqueryLoaded])

  // Once Jquery and Trello Client are loaded, authorize the user and get the token
  const GetToken = () => {
    const expiration = 3600000
    const d = new Date()

    const tokenCreated = localStorage.getItem('token-created')
    if (tokenCreated && parseInt(tokenCreated) + expiration < d.getTime()) {
      window.Trello.deauthorize()
    }
    window.Trello.authorize({
      name: 'Trello API integration',
      persist: true,
      scope: { read: true, write: true, account: true },
      expiration: '1hour',
      success: () => {
        localStorage.setItem('token-created', d.getTime().toString())
        setToken(window.Trello.token())
      },
      error: () => {
        console.log('IM HEREEEE')
        setError(
          'Something went wrong when retrieving the Trello API token. Make sure the API KEY is correct and added.',
        )
      },
    })
  }

  return [token, error]
}

export default useTrelloClient
