import { db, fireAuth as auth, logout, isLoggedIn } from '../../services/firebase/firebase';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from "firebase/firestore";
import './bookreview.css'
import bookSvg from '../../assets/book.svg'
import bookmarkSvg from '../../assets/bookmark1.svg'
import { useNavigate } from 'react-router-dom';
import { getDoc, collection } from "firebase/firestore";
import PropTypes from 'prop-types';
import { BookReviewData } from './BookReviewData';

BookReviewInsert.propTypes = {
    idIn: PropTypes.string,
    // Add other props here
};
// add propslist

export function BookReviewInsert(props) {


    return (
        <>
            <BookReviewData idIn={undefined} />
        </>

    );
}
