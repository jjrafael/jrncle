import actionTypes from '../components/potluck/constants'

const initialState = {
	items: [],
	newItem: {},
	getItemsLoading: false,
	getItemsFailed: false,
}

const potluckReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_ITEMS:
			console.log('jj debug2 reducer')
			return {
				...state,
				getItemsLoading: true,
				getItemsFailed: false,
			}
		case actionTypes.GET_ITEMS_SUCCESS:
			return {
				...state,
				getItemsLoading: false,
				getItemsFailed: false,
				items: action.response,
			}
		case actionTypes.GET_ITEMS_FAILED:
			return {
				...state,
				getItemsLoading: false,
				getItemsFailed: true,
			}
		default:
			return { ...state }
	}
}

export default potluckReducer
