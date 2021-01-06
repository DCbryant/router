import { useContext } from 'react'
import {pathToRegexp} from 'path-to-regexp';
import Context from './Context'

function Route(props) {
  const { path, component: Component, exact = false, render, children } = props
  const { location: { pathname }, location, history } = useContext(Context)
  let keys = []
  // 根据路径生成正则， end为true，则是以path路径结束，end为false则是不以该路径结束
  const reg = pathToRegexp(path, keys, { end: exact });
  const result = pathname.match(reg)
  console.log(result, 'result')
  if (result) {
    const [url, ...rest] = result;
    keys = keys.map(item => item.name)
    const params = rest.reduce((acc, curr, index) => {
      acc[keys[index]] = curr
      return acc
    }, {})
    const match = {
      url: pathname,
      isExact: pathname === url,
      path,
      params
    }
    const props = {
      location,
      history,
      match
    }
    if (Component) {
      return <Component {...props} />
    } else if (render) {
      return render(props)
    } else if (children) {
      return children(props)
    } else {
      return null
    }
  } else {
    return null
  }
}

export default Route
