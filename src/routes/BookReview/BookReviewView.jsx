
import { fireAuth as auth,logout,isLoggedIn } from '../../services/firebase/firebase';


 
   




import React from 'react';
import { useParams } from 'react-router-dom';
export function BookReviewView() {
  isLoggedIn(auth);
  const { bookReviewId } = useParams();
  console.log('choose id',bookReviewId);
  return (
    <div>
      <h1>Pokedex VIEW {bookReviewId}</h1>
    </div>
  );
}