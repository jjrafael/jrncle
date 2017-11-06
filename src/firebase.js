var firebase = require('firebase/app')
// all 3 are optional and you only need to require them at the start
require('firebase/auth')
require('firebase/database')
require('firebase/storage')

const config = {
	apiKey: 'AIzaSyC7j2yio44R3LbSPoEde4mOn6ALXs6wqpY',
	authDomain: 'labs-potluck.firebaseapp.com',
	databaseURL: 'https://labs-potluck.firebaseio.com',
	projectId: 'labs-potluck',
	storageBucket: '',
	messagingSenderId: '1068225680154',
}
firebase.initializeApp(config)
export default firebase
