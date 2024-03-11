import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { fireAuth as auth,logout,isLoggedIn, deleteBookItem } from '../../services/firebase/firebase';
import { useState } from 'react';
import { useEffect } from 'react';
 import { getDocs,collection } from "firebase/firestore";
  import { db } from '../../services/firebase/firebase';
import { v4 as uuidv4 } from 'uuid';



export function BookItemList() {
  const [docs, setDocs] = useState([]);
  const [update, setUpdate] = useState(3);
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
          <button onClick={()=>{deleteBookItem(docIn.id); setUpdate(update+1);getBookLogList()}}>Delete</button>
        ISBN:  {doc.isbn} <span>||</span>
        Title: {doc.title} <span>||</span>
        Author: {doc.author} <span>||</span>
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