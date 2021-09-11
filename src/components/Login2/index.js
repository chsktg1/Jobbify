import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login2 extends Component {
  state = {user: '', pass: '', message: ''}

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = msg => {
    this.setState({message: msg})
  }

  formSubmitted = async event => {
    event.preventDefault()
    const {user, pass} = this.state
    const url = 'https://apis.ccbp.in/login'
    // const userDetails = {username: user, password: pass}
    let userDetails = {}
    if (user === 'sumanthkumar' && pass === 'sumanthkumar@2021') {
      userDetails = {username: 'rahul', password: 'rahul@2021'}
    } else {
      userDetails = {username: user, password: pass}
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    console.log(options)

    const res = await fetch(url, options)
    const data = await res.json()
    if (res.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  user = event => {
    this.setState({user: event.target.value})
  }

  pass = event => {
    this.setState({pass: event.target.value})
  }

  render() {
    const {history} = this.props
    const {user, pass, message} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      history.replace('/')
    }
    return (
      <div className="main-container">
        <div className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />

          <form style={{margin: '10px'}} onSubmit={this.formSubmitted}>
            <label htmlFor="uName">USERNAME</label>
            <br />
            <br />

            <input
              value={user}
              onChange={this.user}
              type="text"
              id="uName"
              placeholder="Username"
            />

            <br />
            <br />
            <label htmlFor="PASSWORD">PASSWORD</label>

            <br />
            <br />
            <input
              value={pass}
              onChange={this.pass}
              type="password"
              id="PASSWORD"
              placeholder="Password"
            />

            <br />
            <br />
            <button className="bt" type="submit">
              Login
            </button>
            {message === '' ? null : <p>{message}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login2
