import { useState, useEffect } from 'react'

declare global {
  interface Window {
    Trello: any
  }
}

const useTrelloClient: (
  apiKey: string | undefined,
) => [string | null, string | null, () => void] = (apiKey) => {
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
    window.Trello.authorize({
      name: 'Trello API integration',
      persist: true,
      type: 'popup',
      scope: { read: true, write: true, account: true },
      expiration: 'never',
      success: () => {
        setToken(window.Trello.token())
      },
      error: () => {
        setError(
          'Something went wrong when retrieving the Trello API token. Make sure the API KEY is correct and added.',
        )
      },
    })
  }

  const logout = () => {
    window.Trello.deauthorize()
  }

  return [token, error, logout]
}

export default useTrelloClient
