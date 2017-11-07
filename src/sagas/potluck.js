import { put, call } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import actionTypes from '../components/potluck/constants'
import * as api from '../services/potluck'

// const errMsg = 'Something went wrong while connecting to server, please try again later.'

// function* getItems(action) {
// 	console.log('jj debug2C')
// 	try {
// 		const { response, xhr } = yield call(api.getItems)
// 		console.log('jj debug1A')
// 		if (response) {
// 			console.log('jj debug1B')
// 			yield put({ type: actionTypes.GET_ITEMS_SUCCESS, response: response })
// 		} else {
// 			console.log('jj debug1C')
// 			const parseResponse = JSON.parse(xhr.response)
// 			const msg = parseResponse.errors[0].message
// 			yield put({ type: actionTypes.GET_ITEMS_FAILED, errMsg: msg })
// 		}
// 	} catch (e) {
// 		console.log('jj debug1D')
// 		yield put({ type: actionTypes.GET_ITEMS_FAILED, errMsg: errMsg })
// 	}
// }

// export default function* potluckSaga() {
// 	console.log('jj debug2EEEsaga1')
// 	yield takeLatest(actionTypes.GET_ITEMS, getItems)
// }

function* getItems(action) {
	//yield put({ type: actionTypes.GET_ITEMS })
	console.log('jj debug2C')
	try {
		const response = yield call(api.getItems)
		if (response) {
			console.log('jj debug1B')
			yield put({ type: actionTypes.GET_ITEMS_SUCCESS, response: response })
		}
	} catch (e) {
		yield put({ type: actionTypes.GET_ITEMS_FAILED })
	}
}

export default function* potluckSaga() {
	console.log('jj debug2EEEsaga2')
	yield takeLatest(actionTypes.GET_ITEMS, getItems)
}
