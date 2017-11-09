import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { auth, provider } from '../../firebase.js'
import { getItems, addItem, removeItem } from './actions'

const mapStateToProps = state => {
  return {
    //external props to include on this component
    potluckItems: state.potluckReducer.items,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      //actions
      getItems,
      addItem,
      removeItem,
    },
    dispatch
  )
}

class Potluck extends Component {
  constructor() {
    super()
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null,
      })
    })
  }
  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user
      this.setState({
        user,
      })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email,
    }
    this.props.addItem(item)
    this.setState({
      currentItem: '',
      username: '',
    })
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      }
    })
    this.props.getItems()
  }

  remove(id) {
    this.props.removeItem(id)
  }

  render() {
    const { potluckItems } = this.props
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>Experiments</h1>
            {this.state.user ? (
              <button onClick={this.logout}>Log Out</button>
            ) : (
              <button onClick={this.login}>Log In</button>
            )}
          </div>
        </header>
        {this.state.user ? (
          <div className="container">
            <section className="add-item">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="What's your name?"
                  onChange={this.handleChange}
                  value={this.state.user.displayName || this.state.user.email}
                  disabled={true}
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
                <ul>
                  {potluckItems.map(item => {
                    return (
                      <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>
                          brought by: {item.user}
                          {item.user === this.state.user.displayName || item.user === this.state.user.email ? (
                            <button onClick={() => this.remove(item.id)}>Remove Item</button>
                          ) : null}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>
            <div>
              <div className="user-profile">
                <img src={this.state.user.photoURL} />
              </div>
            </div>
          </div>
        ) : (
          <p>You must be logged in to see the potluck list and submit to it.</p>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Potluck)
