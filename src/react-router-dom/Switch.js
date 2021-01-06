import { useContext } from 'react';
import {pathToRegexp} from 'path-to-regexp';
import Context from './Context'

function Switch(props) {
  const children = Array.isArray(props.children) ? props.children : [props.children];
  const { location: { pathname }, history } = useContext(Context)

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const { path = '/', component: Component, exact = false } = child.props;
    const reg = pathToRegexp(path, [], { end: exact });
    if (reg.test(path)) {
      return child;
    }
  }

  return null;
}

export default Switch