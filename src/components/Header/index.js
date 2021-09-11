import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

import {BsBagFill} from 'react-icons/bs'

import {AiOutlineHome} from 'react-icons/ai'

import {FiLogOut} from 'react-icons/fi'

import {Link, withRouter} from 'react-router-dom'

class Header extends Component {
  state = {}

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <>
        <div className="header onLargeDevices">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="all-links">
            <li style={{marginRight: '10px'}}>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li> </li>
          </ul>
          <div>
            <button className="btn btn-info mt-2" onClick={this.logout}>
              Logout
            </button>
          </div>
        </div>

        <div className="header onSmallDevices">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="all-links">
            <li style={{marginRight: '15px', marginTop: '12px'}}>
              <Link to="/">
                <AiOutlineHome />
              </Link>
            </li>
            <li style={{marginTop: '12px'}}>
              <Link to="/jobs">
                <BsBagFill />
              </Link>
            </li>

            <FiLogOut
              style={{
                marginLeft: '15px',
                backgroundColor: 'white',
                marginTop: '15px',
              }}
              onClick={this.logout}
            />
          </ul>
        </div>
      </>
    )
  }
}

export default withRouter(Header)
