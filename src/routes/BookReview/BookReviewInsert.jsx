import { db,fireAuth as auth,logout,isLoggedIn } from '../../services/firebase/firebase';


 
export function BookReviewInsert() {
  isLoggedIn(auth);
  return (
    <div>
      <h1>PokedexBook Review Insert form</h1>
    </div>
  );
}