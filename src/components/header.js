import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Auth from './auth'

const mapStateToProps = state => {
  return {
    //external props to include on this component
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      //actions
    },
    dispatch
  )
}

class Header extends Component {
  constructor() {
    super()
    this.state = {
      //internal states
    }
  }

  render() {
    return (
      <header>
        <h1> Firebase + ReactJS Experiment </h1>
        <Auth />
      </header>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
