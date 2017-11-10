import firebase from '../firebase'

//Tables
const tbl_items = (id, params) => {
	let tbl = 'items'
	if (id) {
		tbl = '/' + tbl + '/' + id
	}
	if (params) {
		tbl = tbl + '?' + params
	}
	return firebase.database().ref(tbl)
}

export function getItems() {
	let _tbl = tbl_items()
	return new Promise((resolve, reject) => {
		_tbl.on('value', snapshot => {
			let rawResponse = snapshot.val()
			let items = []
			let err = {
				msg: 'No items fetched',
			}
			for (let item in rawResponse) {
				items.push({
					id: item,
					title: rawResponse[item].title,
					user: rawResponse[item].user,
				})
			}
			if (items) {
				resolve(items)
			} else {
				reject(err)
			}
		})
	})
		.then(items => ({ items }))
		.catch(err => ({ err }))
}

export function addItem(request) {
	let _tbl = tbl_items()
	return new Promise((resolve, reject) => {
		let item = request.params
		let err = {
			msg: 'No item added',
		}
		let newKey = _tbl.push(item).key
		if (newKey) {
			item = {
				...item,
				id: newKey,
			}
			resolve(item)
		} else {
			reject(err)
		}
	})
		.then(item => ({ item }))
		.catch(err => ({ err }))
}

export function removeItem(id) {
	let _tbl = tbl_items(id)
	return new Promise((resolve, reject) => {
		let err = {
			msg: 'No item added',
		}
		_tbl.remove()
		if (id) {
			resolve(id)
		} else {
			reject(err)
		}
	})
		.then(id => ({ id }))
		.catch(err => ({ err }))
}
