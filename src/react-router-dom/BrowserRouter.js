import React, { useState, useEffect } from 'react';
import Context from './Context'

(function (history) {
  const pushState = history.pushState;
  history.pushState = function (state, title, pathname) {
    if (typeof window.onpushstate == "function") {
      window.onpushstate(state, pathname);
    }
    return pushState.apply(history, arguments);
  };
})(window.history);

function BrowserRouter(props) {
  const [location, setLocation] = useState({ pathname: '/' })
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    document.addEventListener('popstate', (e) => {
      setLocation(location => ({
        ...location,
        pathname: document.location.pathname,
        state: e.state
      }))
    })
    return document.removeEventListener('popstate', (e) => { })
  }, [])

  useEffect(() => {
    document.addEventListener('pushstate', (state, pathname) => {
      setLocation(location => ({
        ...location,
        pathname: pathname,
        state: state
      }))
    })
    return document.removeEventListener('pushstate', (state, pathname) => { })
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
          window.history.pushState(state, '', pathname);
        } else {
          window.history.pushState('', '', to);
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

export default BrowserRouter