import actionTypes from './constants'

export function getItems() {
	return {
		type: actionTypes.GET_ITEMS,
	}
}

export function addItem(params) {
	return {
		type: actionTypes.ADD_ITEM,
		params,
	}
}

export function removeItem(id) {
	return {
		type: actionTypes.REMOVE_ITEM,
		id,
	}
}
