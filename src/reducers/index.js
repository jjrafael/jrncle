import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import potluckReducer from './potluck'
import authReducer from './auth'

// main reducers
export const reducers = combineReducers({
	routing: routerReducer,
	potluckReducer,
	authReducer,
})
