import {Route, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

const ProtectedPath = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  //   console.log(props)
  return <Route {...props} />
}

export default ProtectedPath
