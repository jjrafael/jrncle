import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from '../../firebase.js'

const mapStateToProps = state => {
  return {
    //external props to include on this component
    expi: state.nucleusReducer.expi,
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

class Potluck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //internal states
      currentItem: '',
      username: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    //execute after the component loaded
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const itemsRef = firebase.database().ref('items')
    const item = {
      title: this.state.currentItem,
      user: this.state.username,
    }
    itemsRef.push(item)
    this.setState({
      currentItem: '',
      username: '',
    })
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>Fun Food Friends</h1>
          </div>
        </header>
        <div className="container">
          <section className="add-item">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="What's your name?"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <input
                type="text"
                name="currentItem"
                placeholder="What are you bringing?"
                onChange={this.handleChange}
                value={this.state.currentItem}
              />
              <button>Add Item</button>
            </form>
          </section>
          <section className="display-item">
            <div className="wrapper">
              <ul />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Potluck)
