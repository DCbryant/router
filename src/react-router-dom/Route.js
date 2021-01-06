import { useContext } from 'react'
import pathToRegexp from 'path-to-regexp';
import Context from './Context'

function Route(props) {
  const { path, component: Component, exact } = props
  const { location: { pathname } } = useContext(Context)
  // 根据路径生成正则， end为true，则是以path路径结束，end为false则是不以该路径结束
  const reg = pathToRegexp(path, [], { end: exact });
  if (reg.test(pathname)) {
    return <Component />
  } else {
    return null
  }
}

export default Route
