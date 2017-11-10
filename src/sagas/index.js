import { put, call, fork, select } from 'redux-saga/effects'
import potluckSaga from './potluck'
import authSaga from './auth'

// main saga generators
export function* sagas() {
	yield fork(potluckSaga)
	yield fork(authSaga)
}
