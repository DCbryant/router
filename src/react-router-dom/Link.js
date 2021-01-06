import {useContext} from 'react';
import Context from './Context'

function Link (props) {
  const { to, children } = props
  const { history } = useContext(Context)

  const goto = () => {
    history.push(to)
  }

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a onClick={goto}>
      {children}
    </a>
  )
}

export default Link