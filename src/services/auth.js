import { auth, provider } from '../firebase'

export function gLogin() {
	return new Promise((resolve, reject) => {
		auth.signInWithPopup(provider).then(result => {
			let err = {
				msg: 'Google login failed',
			}
			let user = result.user
			if (user) {
				resolve(user)
			} else {
				reject(err)
			}
		})
	})
		.then(user => ({ user }))
		.catch(err => ({ err }))
}

export function gLogout() {
	return new Promise((resolve, reject) => {
		auth
			.signOut()
			.then(() => {
				resolve()
			})
			.catch(() => {
				reject()
			})
	})
}

export function setAuthUser() {
	return new Promise((resolve, reject) => {
		auth.onAuthStateChanged(user => {
			let err = {
				msg: 'No account fetched',
			}
			if (user) {
				resolve(user)
			} else {
				reject(err)
			}
		})
	})
		.then(user => ({ user }))
		.catch(err => ({ err }))
}
