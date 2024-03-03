import config from '../../../firebaseConfig.json' with { type: "json" }
console.log(config)
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {getFirestore,collection, getDocs} from 'firebase/firestore'
import {initializeApp} from 'firebase/app'
import {Link, useNavigate} from 'react-router-dom';




const firebase = initializeApp(
 
    config);
const auth = getAuth(firebase)
const db = getFirestore(firebase)

export function isLoggedIn(auth){
    // onAuthStateChanged(auth, user => {
    //     if (user) {
    //         console.log(
    //             'logged in!!!!'
    //         )
    //         return true
    //     }
    //     else {
    //         console.log(
    //             'not logged in!!!!'
    //         )
    //         navigate('/login')
    //        return false
    //     } })
    }

export function logout() { 
    
    auth.signOut().then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
      
}



const booksCollection = collection(db, 'books-cry')
const querySnapshot = await getDocs(booksCollection)
console.log(querySnapshot.docs.map(doc => doc.data()))




var bookData = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    published_date: '1925'
};
export const app = firebase
export const fireAuth= auth;