import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { fireAuth as auth,logout,isLoggedIn } from '../../services/firebase/firebase';


   


export function BookLogView() {
  isLoggedIn(auth);
  
  return (
    <div>
      <h1>Pokedex</h1>
    </div>
  );
}