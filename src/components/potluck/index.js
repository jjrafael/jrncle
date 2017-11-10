import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { auth, provider } from '../../firebase.js'
import { getItems, addItem, removeItem } from './actions'

const mapStateToProps = state => {
  return {
    //external props to include on this component
    potluckItems: state.potluckReducer.items,
    user: state.authReducer.user,
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
      userName: '',
      items: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    const { user } = this.props
    e.preventDefault()
    const item = {
      title: this.state.currentItem,
      user: user.displayName || user.email,
    }
    this.props.addItem(item)
    this.setState({
      currentItem: '',
      userName: '',
    })
  }

  componentDidMount() {
    if (this.state.user) {
      this.props.getItems()
    }
  }

  remove(id) {
    this.props.removeItem(id)
  }

  render() {
    const { potluckItems, user } = this.props
    return (
      <div className="potluck-container">
        {user ? (
          <div className="container">
            <section className="add-item">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="userName"
                  placeholder="What's your name?"
                  onChange={this.handleChange}
                  value={user.displayName || user.email}
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
                          {item.user === user.displayName || item.user === user.email ? (
                            <button onClick={() => this.remove(item.id)}>Remove Item</button>
                          ) : null}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>
          </div>
        ) : (
          <p>You must be logged in to see the potluck list and submit to it.</p>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Potluck)
