import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { fireAuth as auth,logout,isLoggedIn, deleteBookLog } from '../../services/firebase/firebase';
import { useState } from 'react';
import { useEffect } from 'react';
 import { getDocs,collection } from "firebase/firestore";
  import { db } from '../../services/firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import './booklog.css'


export function BookLogList() {
  const [docs, setDocs] = useState([]);
  const [update, setUpdate] = useState(0);
   function getBookLogList() {

    getDocs(collection(db, "book_item")).then((querySnapshot) => {
      const resultData = [];
      querySnapshot.forEach((docIn) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(docIn.id, " => ", docIn.data());
        const doc = docIn.data();
        const dateOut = new Date(doc.date);
        
        resultData.push(      
        <div key={uuidv4()} className="log-list-item">
        ISBN:  {doc.ISBN} <span>||</span>
        Page Number: {doc.page_number} <span>||</span>
        Date: {dateOut.toLocaleDateString()}
        <p> <button onClick={()=>{deleteBookItem(docIn.id); setUpdate(update +2)}}>Delete</button></p>

        <p>Comments: {doc.comments}</p>
      </div>);

      });
      setDocs(resultData)
    }
    
     );
  }
  useEffect(() => {
    getBookLogList()
  },[update])

  isLoggedIn(auth);
  return (
    <div className="log-list-grid">
    {docs}
    </div>
  );
}