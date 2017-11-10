import actionTypes from '../components/auth/constants'

const initialState = {
	user: null,
	loginLoading: false,
	loginFailed: false,
	logoutLoading: false,
	logoutFailed: false,
	setAuthUserLoading: false,
	setAuthUserFailed: false,
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN:
			return {
				...state,
				loginLoading: true,
				loginFailed: false,
			}
		case actionTypes.LOGIN_SUCCESS:
			return {
				...state,
				loginLoading: false,
				loginFailed: false,
				user: {
					...state.user,
					displayName: action.response.displayName,
					email: action.response.email,
					profilePhoto: action.response.photoURL,
					uid: action.response.uid,
				},
			}
		case actionTypes.LOGIN_FAILED:
			return {
				...state,
				loginLoading: false,
				loginFailed: true,
			}

		case actionTypes.LOGOUT:
			return {
				...state,
				logoutLoading: true,
				logoutFailed: false,
			}
		case actionTypes.LOGOUT_SUCCESS:
			return {
				...state,
				logoutLoading: false,
				logoutFailed: false,
				user: null,
			}
		case actionTypes.LOGOUT_FAILED:
			return {
				...state,
				logoutLoading: false,
				logoutFailed: true,
			}

		case actionTypes.SET_AUTH_USER:
			return {
				...state,
				setAuthUserLoading: true,
				setAuthUserFailed: false,
			}
		case actionTypes.SET_AUTH_USER_SUCCESS:
			return {
				...state,
				setAuthUserLoading: false,
				setAuthUserFailed: false,
				user: {
					...state.user,
					displayName: action.response && action.response.displayName,
					email: action.response.email,
					profilePhoto: action.response.photoURL,
					uid: action.response.uid,
				},
			}
		case actionTypes.SET_AUTH_USER_FAILED:
			return {
				...state,
				setAuthUserLoading: false,
				setAuthUserFailed: true,
			}
		default:
			return { ...state }
	}
}

export default authReducer
