
import { fireAuth as auth,logout,db,isLoggedIn } from '../../services/firebase/firebase';

import { useEffect,useState} from 'react';
import { BookReviewData } from './BookReviewData';
 
   

import React, {memo} from 'react';
import { useParams } from 'react-router-dom';
export function BookReviewView() {
  const [bookData, SetBookData] = useState({});
  // isLoggedIn(auth);
  
  const { bookReviewId } = useParams();
  console.log('choose id',bookReviewId);

  useEffect(() => {},[])
      
  return (
    <>
    <BookReviewData id={bookReviewId} />
</>
      
  );
}
