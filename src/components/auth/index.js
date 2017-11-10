import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { auth, provider } from '../../firebase.js'
import { login, logout, setAuthUser } from './actions'

const mapStateToProps = state => {
  return {
    //external props to include on this component
    user: state.authReducer.user,
    loginLoading: state.authReducer.loginLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      //actions
      login,
      logout,
      setAuthUser,
    },
    dispatch
  )
}

class Auth extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      provider: 'google',
    }
    this._login = this._login.bind(this)
    this._logout = this._logout.bind(this)
  }

  _logout() {
    this.props.logout(this.state.provider)
  }

  _login() {
    this.props.login(this.state.provider)
  }

  componentDidMount() {
    this.props.setAuthUser()
  }

  render() {
    const { user } = this.props
    return (
      <div className="auth-container">
        {user ? (
          <div className="wrapper log-in">
            <button onClick={this._logout}>Log Out</button>
            <div className="user-profile">
              <img src={user.profilePhoto} />
            </div>
          </div>
        ) : (
          <div className="wrapper log-in">
            <button onClick={this._login} data-provider="google">
              Log In
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
