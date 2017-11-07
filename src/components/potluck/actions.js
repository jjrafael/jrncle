import actionTypes from './constants'

export function getItems() {
	console.log('jj debug2B')
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

export function removeItems(id) {
	return {
		type: actionTypes.REMOVE_ITEM,
		id,
	}
}
