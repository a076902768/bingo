import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAuiClmuRCCMuvnyO2862sVJ8QNIewW_lQ',
  authDomain: 'myfirstproject-3748e.firebaseapp.com',
  databaseURL: 'https://myfirstproject-3748e.firebaseio.com',
  projectId: 'myfirstproject-3748e',
  storageBucket: 'myfirstproject-3748e.appspot.com',
  messagingSenderId: '194864308027',
  appId: '1:194864308027:web:09ba16f9a4de2ab58be11e',
}

// 確認firebase是否準備初始化
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
