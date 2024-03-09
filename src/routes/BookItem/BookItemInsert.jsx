import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db, fireAuth as auth, logout, isLoggedIn } from '../../services/firebase/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
// Add a new document in collection "cities"



export function BookLogInsert() {


  const [title, SetTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [author, setAuthor] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date();
    const bookData = {
      page_number: pageNumber,
      date: timestamp.toISOString(),
      ISBN: isbn,
      comments: comments
    };

    // Convert bookData to JSON
    const bookDataJson = JSON.stringify(bookData);
    console.log(bookDataJson)
    localStorage.setItem('pageNumber', pageNumber);
    localStorage.setItem('isbn', isbn);
    localStorage.setItem('comments', comments);
    await setDoc(doc(db, "booklog", uuidv4()), bookData);
  }
  function setDataIfExist() {
    if (localStorage.getItem('pageNumber')) {
      setPageNumber(localStorage.getItem('pageNumber'));
    }
    if (localStorage.getItem('isbn')) {
      setIsbn(localStorage.getItem('isbn'));
    }
    if (localStorage.getItem('comments')) {
      setComments(localStorage.getItem('comments'));
    }
  }
  useEffect(() => {
    setDataIfExist()
    
  },[])
  isLoggedIn(auth);
  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <label>
        Page Number:
        <input type="number" value={pageNumber} onChange={e => setPageNumber(e.target.value)} required /> <br />        </label>

      <label>
        ISBN:
        <input type="text" value={isbn} onChange={e => setIsbn(e.target.value)} required /><br />
      </label>
      <label>
        Comments:
        <textarea value={comments} onChange={e => setComments(e.target.value)} required /><br />
      </label>
      <button type="submit">Add Book</button>
    </form>
  );

}