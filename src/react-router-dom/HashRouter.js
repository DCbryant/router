import {useState, useEffect} from 'react';
import Context from './Context'

export default function HashRouter (props) {
  const [location, setLocation] = useState({
    pathname: window.location.hash.slice(1)
  })
  const [locationState, setLocationState] = useState(undefined)
  const [msg, setMsg] = useState(undefined)


  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setLocation(location => ({
        ...location,
        pathname: window.location.hash.slice(1),
        state: locationState
      }))
    })
    window.location.hash = window.location.hash || '/'
    return document.removeEventListener('hashchange', () => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    location: location,
    history: {
      push (to) { // 传参
        if (msg) {
          const allow = window.confirm(msg(location)+`，并且跳转到${typeof to === 'object' ? to.pathname : to}吗?`)
          if (!allow) return
        }
        if (typeof to === 'object') {
          const {pathname, state} = to;
          setLocationState(state)
          window.location.hash = pathname
        } else {
          window.location.hash = to;
        }
      },
      block(message) {
        setMsg(message)
      },

      unblock(message) {
        setMsg(null)
      }
    }
  }

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  )
}