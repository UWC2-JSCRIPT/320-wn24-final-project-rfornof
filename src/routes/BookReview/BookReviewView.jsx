
import { fireAuth as auth,logout,db,isLoggedIn } from '../../services/firebase/firebase';
import { getDoc,doc,collection } from "firebase/firestore";
import { useEffect,useState} from 'react';

 
   

import React from 'react';
import { useParams } from 'react-router-dom';
export function BookReviewView() {
  const [bookData, SetBookData] = useState({});
  isLoggedIn(auth);
  const { bookReviewId } = useParams();
  console.log('choose id',bookReviewId);
  function getInfoFromFirebase(){
    const docRef = doc(db, "review", bookReviewId);
    
     getDoc(docRef).then((docSnap) => {

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        SetBookData(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
  })
  }
  useEffect(() => {getInfoFromFirebase();},[])
      
  return (
    <div>
      <h1>Book Review Id: {bookReviewId}</h1>
  
      
      <ul>
                {Object.entries(bookData).map(([key, value]) => (
                    <li key={key}>{`${key}: ${value}`}</li>
                ))}
            </ul>
            
    </div>
  );
}