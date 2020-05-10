import React from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'

let firebaseApp
let storageRef

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCZwP_gTXMk5E94DNzaay2qJ_7Cd7H3F9U",
    authDomain: "image-bucket-8c6fe.firebaseapp.com",
    databaseURL: "https://image-bucket-8c6fe.firebaseio.com",
    projectId: "image-bucket-8c6fe",
    storageBucket: "image-bucket-8c6fe.appspot.com",
    messagingSenderId: "388778174182",
    appId: "1:388778174182:web:76e00b44419f667ec37d27",
    measurementId: "G-J4G1GBFBSY",
  })
} else {
  firebaseApp = firebase.app()
}

storageRef = firebaseApp.storage().ref()

export default storageRef