import { put, call, fork, select } from 'redux-saga/effects'
import potluckSaga from './potluck'

// main saga generators
export function* sagas() {
	yield fork(potluckSaga)
}
