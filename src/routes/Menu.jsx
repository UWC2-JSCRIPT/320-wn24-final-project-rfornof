import React from 'react'
import {Link} from 'react-router-dom'
import './BookReview/bookreview.css'
import { useNavigate } from 'react-router-dom';


import { fireAuth as auth,logout,isLoggedIn } from '../services/firebase/firebase';


export function Menu () {
    const navigate = useNavigate();
    // isLoggedIn(auth);
  return (
    <div>
        <a className='blue-link fonty home-position'  onClick={()=>{ navigate('/')}}>Back to Table of Contents</a>
    <span>          <a className='blue-link fonty logout-position'  onClick={()=>{ navigate('/login');logout()}}>LogOut</a><br/>


    </span>
    </div>
  )
}