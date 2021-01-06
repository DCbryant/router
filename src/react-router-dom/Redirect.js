import {useContext} from 'react';
import Context from './Context'

function Redirect (props) {
  const {to} = props;
  const { history } = useContext(Context)

  history.push(to) 
  return null
}


export default Redirect