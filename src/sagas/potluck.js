import { put, call } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import actionTypes from '../components/potluck/constants'
import * as api from '../services/potluck'

function* getItems() {
	try {
		const response = yield call(api.getItems)
		if (response && !response.err) {
			yield put({ type: actionTypes.GET_ITEMS_SUCCESS, response: response.items })
		} else {
			yield put({ type: actionTypes.GET_ITEMS_FAILED })
		}
	} catch (e) {
		yield put({ type: actionTypes.GET_ITEMS_FAILED })
	}
}

function* addItem(request) {
	try {
		const response = yield call(api.addItem, request)
		if (response && !response.err) {
			yield put({ type: actionTypes.ADD_ITEM_SUCCESS, response: response.item })
		} else {
			yield put({ type: actionTypes.ADD_ITEM_FAILED })
		}
	} catch (e) {
		yield put({ type: actionTypes.ADD_ITEM_FAILED })
	}
}

function* removeItem(action) {
	try {
		const response = yield call(api.removeItem, action.id)
		if (response && !response.err) {
			yield put({ type: actionTypes.REMOVE_ITEM_SUCCESS, id: response.id })
		} else {
			yield put({ type: actionTypes.REMOVE_ITEM_FAILED })
		}
	} catch (e) {
		yield put({ type: actionTypes.REMOVE_ITEM_FAILED })
	}
}

export default function* potluckSaga() {
	yield takeLatest(actionTypes.GET_ITEMS, getItems)
	yield takeLatest(actionTypes.ADD_ITEM, addItem)
	yield takeLatest(actionTypes.REMOVE_ITEM, removeItem)
}
