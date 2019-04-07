// import app from "firebase/app"
// import auth from "firebase/auth"
// const firebase = require("firebase")
// import * as firebase from 'firebase';

// Firebase App is always required and must be first
let firebase = require("firebase/app")

// Add additional services that you want to use
require("firebase/auth")
require("firebase/database")
require("firebase/firestore")
require("firebase/messaging")
require("firebase/functions")

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}
firebase.initializeApp(config)

// class Firebase {
// 	constructor() {
// 		app.initializeApp(dbConfig)
// 	}
// }

// export default Firebase

// const provider = new app.auth.GoogleAuthProvider()
// const auths = app.auth()
// module.exports = {
// 	app,
// 	provider,
// 	auths,
// }

// WORKS
const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }
