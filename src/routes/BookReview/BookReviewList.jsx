import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { fireAuth as auth, logout, isLoggedIn, deleteReview } from '../../services/firebase/firebase';
import '../BookLog/booklog.css'
import './bookreview.css'
import { useState, useEffect } from 'react';
import { getDocs, collection } from "firebase/firestore";
import { db } from '../../services/firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import bookmarkBig from '../../assets/bookmark_big.png'
import {Menu} from '../Menu'
export function BookReviewList() {
  const isReadOnly = true;

  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [update, setUpdate] = useState(0);
  const [stars, setStars] = useState([]);
  const [rating, setRating] = useState(0);
  isLoggedIn(auth);
  function getBookReviewList() {

    getDocs(collection(db, "review")).then((querySnapshot) => {
      const resultData = [];
      querySnapshot.forEach((docIn) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(docIn.id, " => ", docIn.data());
        const doc = docIn.data();
        const dateOut = new Date(doc.finish_date);
      
        
        resultData.push(

          <div key={uuidv4()} className="log-list-item">
            <img className="bookmark-size" src={bookmarkBig} width="300vh" alt="book mark" />
            <div className='position-bookmark'>
              <a className="link" onClick={ ()=> navigate(`/book_review_view/${docIn.id}`)}> 
             <span className='fonty fonty2'>{doc.title}</span></a> <br/><br/>{stars} <br/><br/>
             <span className='fonty fonty2'> Author: {doc.author}</span><br/><br/>

             <span className='fonty fonty2'> Completed: {dateOut.toLocaleDateString()} </span><br/><br/>
              <button 
              onClick={() => { 
              deleteReview(docIn.id); 
              setUpdate(update + 1 ) }}>DELETE</button>
                </div>
                
          </div>);

      });
      setDocs(resultData)
    }

    );
  }
  function star(stars = 0, readOnly = false) {

    
          
    const resultOut = []
        for (let i = 0; i < 5; i++) {
            if (stars > i) {
                resultOut.push(<span onClick={() => {
                    star(isReadOnly? rating:i + 1, isReadOnly)

                }} className="fa fa-star checked" readOnly={isReadOnly}></span>)

            }
            else {
                resultOut.push(<span onClick={() => {
                    star(isReadOnly? rating: i + 1,isReadOnly)
                }} className="fa fa-star" readOnly={isReadOnly}></span>)
            }
        }
        
    
    
        // setRating(stars)
        // setFirstStarHit(firstStarHit+1)
        setStars(resultOut)
        
        console.log('made it out, did ratings and such')



}
  useEffect(() => {
    
    getBookReviewList()
   
console.log('rating', rating)
  }, [update, rating])
  return (
    <>
   
<Menu/>
    <div className="log-list-grid">
  <div className='log-list-item'>

  
  </div>
      {docs}
    </div>
    </>
  );
}