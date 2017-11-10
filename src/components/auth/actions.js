import actionTypes from './constants'

export function login(provider, params) {
	return {
		type: actionTypes.LOGIN,
		provider,
		params,
	}
}

export function logout(provider) {
	return {
		type: actionTypes.LOGOUT,
		provider,
	}
}

export function signup(params) {
	return {
		type: actionTypes.SIGNUP,
		params,
	}
}

export function setAuthUser() {
	return {
		type: actionTypes.SET_AUTH_USER,
	}
}
