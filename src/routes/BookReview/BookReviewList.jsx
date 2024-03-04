import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { fireAuth as auth,logout,isLoggedIn } from '../../services/firebase/firebase';
import '../BookLog/booklog.css'
import { useState,useEffect} from 'react';
import { getDocs,collection } from "firebase/firestore";
import { db } from '../../services/firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

export function BookReviewList() {
  const [docs, setDocs] = useState([]);

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
                  <a href= {`book_review_view/${docIn.id}`}> title:  {doc.title} <span>||</span></a>
        finishDate: {dateOut.toLocaleDateString()} <span>||</span>
        
      </div>);

      });
      setDocs(resultData)
    }
    
     );
  }
  useEffect(() => {
    getBookReviewList()
  },[])
  return (
    <div className="log-list-grid">
    {docs}
    </div>
  );
}