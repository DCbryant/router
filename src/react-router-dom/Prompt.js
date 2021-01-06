import { useContext, useEffect } from 'react'
import Context from './Context'


function Prompt (props) {
  const {when, message} = props;
  const { history } = useContext(Context)
  useEffect(() => {
    history.unblock()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (when) {
    history.block(message)
  } else {
    history.block(null)
  }

  return
}

export default Prompt

