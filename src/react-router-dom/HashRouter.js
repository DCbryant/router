import {useState, useEffect} from 'react';
import Context from './Context'

export default function HashRouter (props) {
  const [location, setLocation] = useState({
    pathname: window.location.hash.slice(1)
  })
  const [locationState, setLocationState] = useState(undefined)


  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setLocation(location => ({
        ...location,
        pathname: window.location.hash.slice(1),
        state: locationState
      }))
    })
    window.location.hash = window.location.hash || '/'
    return document.removeEventListener('hashchange')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    location: location,
    history: {
      push (to) { // 传参
        if (typeof to === 'object') {
          const {pathname, state} = to;
          setLocationState(state)
          window.location.hash = pathname
        } else {
          window.location.hash = to;
        }
      }
    }
  }

  return (
    <Context value={value}>
      {props.children}
    </Context>
  )
}