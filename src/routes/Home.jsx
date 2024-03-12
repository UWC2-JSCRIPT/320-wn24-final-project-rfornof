
import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { fireAuth as auth,logout,isLoggedIn } from '../services/firebase/firebase';
//'../../services/firebase/firebase.js';
import tableOfContents from '../assets/table_of_contents.png';
import './home.css';
import "./BookReview/bookreview.css";


export function Home() {
   
    const navigate = useNavigate();
    function loggedIn(){
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log(
                'logged in!!!!'
            )
            return true
        }
        else {
            console.log(
                'not logged in!!!!'
            )
            navigate('/login')
           return false
        } })
    }
    loggedIn();
    useEffect(() => {
      

    }
    , []);


function goToBookLog(){
    navigate('/book_log')
 
}
function goToBookLogList(){
    navigate('/book_log_list')
 
}



return (
    <div>
         {/* <button onClick={()=>{ navigate('/book_item_list')}}>List Book Items</button>
        <button onClick={()=>{ navigate('/book_item')}}>Make Book Item</button> */}

        {/* <br/>
        <br/> 
        <button onClick={()=>{ navigate('/book_log')}}>Make Book Log</button>
        <button onClick={()=>{ navigate('/book_log_list')}}>List Book Logs</button> */}

        <br/>
        <br/> 
        <img src={tableOfContents} alt="table of contents" width="300vh" />  <br/>
        <a className='blue-link fonty'  onClick={()=>{ navigate('/book_review')}}>Create a Review.........pg.   3</a><br/>
        <a className='blue-link fonty' onClick={()=>{ navigate('/book_review_list')}}>List of Reviews..........pg.   4</a>
        <br/>
        <br/>
        <button onClick={()=>{logout()}}>Logout</button>
    
    </div>


);
}

export default Home;