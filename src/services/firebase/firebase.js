import config from '../../../firebaseConfig.json' with { type: "json" }
console.log(config)
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {getFirestore,collection, getDocs} from 'firebase/firestore'
import {initializeApp} from 'firebase/app'
const firebase = initializeApp(
 
    config);
const auth = getAuth(firebase)
const db = getFirestore(firebase)

const booksCollection = collection(db, 'books-cry')
const querySnapshot = await getDocs(booksCollection)
console.log(querySnapshot.docs.map(doc => doc.data()))
// onAuthStateChanged(auth, user => {
// if (user) {
//     console.log('User is signed in')
// }
// else {
//     console.log('User is signed out')
// } })



var bookData = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    published_date: '1925'
};
