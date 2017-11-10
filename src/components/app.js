import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from './header'
import Potluck from './potluck'

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

class App extends Component {
  constructor() {
    super()
    this.state = {
      //internal states
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Potluck />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
