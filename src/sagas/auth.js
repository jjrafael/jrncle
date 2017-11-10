import { put, call } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import actionTypes from '../components/auth/constants'
import potluckActionTypes from '../components/potluck/constants'
import * as api from '../services/auth'

function* login(action) {
	try {
		let response = null
		if (action.provider === 'google') {
			response = yield call(api.gLogin)
		} else {
			response = yield call(login)
		}
		if (response && !response.err) {
			yield put({ type: actionTypes.LOGIN_SUCCESS, response: response.user })
			yield put({ type: potluckActionTypes.GET_ITEMS })
		} else {
			yield put({ type: actionTypes.LOGIN_FAILED })
		}
	} catch (e) {
		yield put({ type: actionTypes.LOGIN_FAILED })
	}
}

function* logout(action) {
	try {
		if (action.provider === 'google') {
			yield call(api.gLogout)
		} else {
			yield call(logout)
		}
		yield put({ type: actionTypes.LOGOUT_SUCCESS })
	} catch (e) {
		yield put({ type: actionTypes.LOGOUT_FAILED })
	}
}

function* setAuthUser() {
	try {
		const response = yield call(api.setAuthUser)
		if (response && !response.err) {
			yield put({ type: actionTypes.SET_AUTH_USER_SUCCESS, response: response.user })
			yield put({ type: potluckActionTypes.GET_ITEMS })
		} else {
			yield put({ type: actionTypes.SET_AUTH_USER_FAILED })
		}
	} catch (e) {
		yield put({ type: actionTypes.SET_AUTH_USER_FAILED })
	}
}

export default function* loginSaga() {
	yield takeLatest(actionTypes.LOGIN, login)
	yield takeLatest(actionTypes.LOGOUT, logout)
	yield takeLatest(actionTypes.SET_AUTH_USER, setAuthUser)
}
