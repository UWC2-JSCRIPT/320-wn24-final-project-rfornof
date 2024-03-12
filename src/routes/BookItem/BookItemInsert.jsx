import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db, fireAuth as auth, logout, isLoggedIn } from '../../services/firebase/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
// Add a new document in collection "cities"



export function BookItemInsert() {

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [author, setAuthor] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date();
    const bookData = {
      title: title,
      author: author,
      isbn: isbn,
    
    };

    // Convert bookData to JSON
    const bookDataJson = JSON.stringify(bookData);
    console.log(bookDataJson)
    localStorage.setItem('title', title);
    localStorage.setItem('isbn', isbn);
    localStorage.setItem('author', author);
    const id = uuidv4()
    setDoc(doc(db, "book_item", id ), bookData).then((data) => {
      console.log(`${id} ==> ${bookData}`)
      navigate(`/book_item_list`)
    })};
  

  useEffect(() => {
  
    
  },[author])
  isLoggedIn(auth);
  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <label>
        Author:
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required /> <br />        </label>

      <label>
        ISBN:
        <input type="text" value={isbn} onChange={e => setIsbn(e.target.value)} required /><br />
      </label>
      <label>
        Title:
        <textarea value={title} onChange={e => setTitle(e.target.value)} required /><br />
      </label>
      <button type="submit">Add Book Item</button>
    </form>
  );

}