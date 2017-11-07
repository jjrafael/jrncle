import firebase from '../firebase'

//Tables
const tbl_items = (id, params) => {
	let tbl = 'items'
	if (id) {
		tbl = '/' + tbl + '/' + id
	}
	if (params) {
		tbl = tbl + '/' + params
	}
	return firebase.database().ref(tbl)
}

export function getItems() {
	console.log('jj debug2D')
	let _tbl = tbl_items()
	_tbl.on('value', snapshot => {
		let items = snapshot.val()
		let newState = []
		for (let item in items) {
			newState.push({
				id: item,
				title: items[item].title,
				user: items[item].user,
			})
		}
		return newState
	})
}

export function addItem(params) {
	let _tbl = tbl_items()
	if (params) {
		_tbl.push(params)
	} else {
		//do nothing for now
	}
}

export function removeItem(id) {
	let _tbl = tbl_items(id)
	_tbl.remove()
}
