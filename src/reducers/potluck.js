import actionTypes from '../components/potluck/constants'

const initialState = {
	items: [],
	newItem: {},
	getItemsLoading: false,
	getItemsFailed: false,
	addItemLoading: false,
	addItemFailed: false,
	removeItemLoading: false,
	removeItemFailed: false,
}

const potluckReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_ITEMS:
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

		case actionTypes.ADD_ITEM:
			return {
				...state,
				addItemLoading: true,
				addItemFailed: false,
			}
		case actionTypes.ADD_ITEM_SUCCESS:
			return {
				...state,
				addItemLoading: false,
				addItemFailed: false,
				items: [...state.items, action.response],
			}
		case actionTypes.ADD_ITEM_FAILED:
			return {
				...state,
				addItemLoading: false,
				addItemFailed: true,
			}

		case actionTypes.REMOVE_ITEM:
			return {
				...state,
				removeItemLoading: true,
				removeItemFailed: false,
			}
		case actionTypes.REMOVE_ITEM_SUCCESS:
			return {
				...state,
				removeItemLoading: false,
				removeItemFailed: false,
				items: state.items.filter(item => item.id !== action.id),
			}
		case actionTypes.REMOVE_ITEM_FAILED:
			return {
				...state,
				removeItemLoading: false,
				removeItemFailed: true,
			}
		default:
			return { ...state }
	}
}

export default potluckReducer
