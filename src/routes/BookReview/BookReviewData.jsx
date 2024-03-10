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

BookReviewData.propTypes = {
    id: PropTypes.string||PropTypes.undefined,
    // Add other props here
};
// add propslist

export function BookReviewData(props) {

    

    let navigate
    let readOnlyNow = false
    if(!props.id){
        console.log('read only is true')
        readOnlyNow = true
    }
    const [isReadOnly, setIsReadOnly]= useState(readOnlyNow)
   
    if (isReadOnly == false) {
        isLoggedIn(auth);
        navigate = useNavigate();
    }
    const [bookNumber, setBookNumber] = useState('');
    const [bookType, setBookType] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [rating, setRating] = useState(0);
    const [firstStarHit, setFirstStarHit] = useState(0)
    // const [recommendedBy, setRecommendedBy] = useState(localStorage.getItem('recommended_by') || '');
    // const [pageLength, setPageLength] = useState(localStorage.getItem('page_length') || '');
    // const [isFiction, setIsFiction] = useState(JSON.parse(localStorage.getItem('is_fiction')) || false);
    // const [enjoyedEnding, setEnjoyedEnding] = useState(JSON.parse(localStorage.getItem('enjoyed_ending')) || false);
    // const [favoriteChar, setFavoriteChar] = useState(localStorage.getItem('favorate_char') || '');
    // const [readingEase, setReadingEase] = useState(localStorage.getItem('reading_ease') || '');
    // const [plot, setPlot] = useState(localStorage.getItem('plot') || '');
    // const [favoriteQuotes, setFavoriteQuotes] = useState(localStorage.getItem('favorite_quotes') || '');
    // const [reviewNotes, setReviewNotes] = useState(localStorage.getItem('review_notes') || '');
    // const [askAuthor, setAskAuthor] = useState(localStorage.getItem('ask_author') || '');
    // const [isRecommended, setIsRecommended] = useState(JSON.parse(localStorage.getItem('is_recommended')) || false);
    const [stars, setStars] = useState([])
   
    const [overallData, setOverallData] = useState()
    function getInfoFromFirebase(id) {
        if (!props.id) {
            return
        }

        console.log('props.id', props.id)
        const docRef = doc(db, "review", props.id);

        getDoc(docRef).then((docSnap) => {
            console.log(docSnap.data(), 'docSnap')
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setProps(docSnap.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }
    function setProps(bookData) {
        // if(!props.id){
        //     return
        // }
        console.log(bookData, 'bookData')

        setBookNumber(bookData.book_number)
        setBookType(bookData.book_type)
        setTitle(bookData.title)
        setAuthor(bookData.author)
        setStartDate(bookData.start_date)
        setFinishDate(bookData.finish_date)
        setRating(bookData.rating)
        star(bookData.rating, isReadOnly)

        console.log(rating, '.rating')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookData = {
            book_number: bookNumber,
            book_type: bookType,
            title: title,
            author: author,
            start_date: startDate,
            finish_date: finishDate,
            rating: rating,
            // recommended_by: recommendedBy,
            // page_length: pageLength,
            // is_fiction: isFiction,
            // enjoyed_ending: enjoyedEnding,
            // favorate_char: favoriteChar,
            // reading_ease: readingEase,
            // plot: plot,
            // favorite_quotes: favoriteQuotes,
            // review_notes: reviewNotes,
            // ask_author: askAuthor,
            // is_recommended: isRecommended
        };
        for (let key in bookData) {
            localStorage.setItem(key, bookData[key]);
        }
        const uuid = uuidv4()
        setDoc(doc(db, "review", uuid), bookData).then((doc) => {
            console.log('sent document to review', uuid)
            navigate(`/book_review_view/${uuid}`)
        })
    };
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
            
        
        
            setRating(stars)
            setFirstStarHit(firstStarHit+1)
            setStars(resultOut)
            
            console.log('made it out, did ratings and such')
    


    }
    function selectBookType() {
        const listOfRadioItems = [
            ["ebook", "eBook"],
            ["audiobook", "Audiobook"],
            ["hardback", "HardBack"],
            ["paperback", "PaperBack"],
        ]
        const resultOut = []
        for (const item of listOfRadioItems) {
            if(bookType !='' && bookType=== item[0]){
                resultOut.push(<div className="type-grid-item"><input checked={true} 
                readOnly={isReadOnly} type="radio" id={item[0]} name="book_type" value={item[0]}
                    onChange={() => {
                    setBookType(item[0])
                    console.log(item[0])
                }} />
                    <label htmlFor={item[0]}>{item[1]}</label><br /> </div>)
                    continue
            }
            resultOut.push(<div className="type-grid-item"><input  
            readOnly={isReadOnly} type="radio" id={item[0]} name="book_type" value={item[0]}
                onChange={() => {
                setBookType(item[0])
                console.log(item[0])
            }} />
                <label htmlFor={item[0]}>{item[1]}</label><br /> </div>)


        }
        return resultOut
    }
    function handleOverallData() {
    
        setOverallData(
            <>
                <div className="type-grid">
                    {selectBookType()}
                   
                </div>
                <div className="header-book">
                    <img src={bookSvg} className="book-background header-book-item"></img>
                    <span className="fonty header-book-item header-book-title">Book Review</span>
                    <div className="header-book-item header-book-bookmark">
                        <img width="100%" src={bookmarkSvg} />
                        <input type="text" readOnly={isReadOnly} value={bookNumber} onChange={(event) => { setBookNumber(event.target.value) }} className="header-book-item book-number" />
                    </div>

                    <div className="header-book-item line-title " >
                        Title
                    </div>
                    <div className="line line-title"></div>
                    <input type="text" value={title} readOnly={isReadOnly} className="line line-title  underneath-offset" onChange={(event) => { setTitle(event.target.value) }} />

                    <div className="line line-author "> </div>

                    <div className="line-author"  >
                        Author
                    </div>
                    <input type="text"  value={author} readOnly={isReadOnly} onChange={(event) => { setAuthor(event.target.value) }}
                        className="line-author underneath-offset-author" />
                    <div className='date-start'>
                        <div className="date-label">Start-date <span className="space"></span>Finish-date<br /></div>
                        <input type="date"  value={startDate} readOnly={isReadOnly} onChange={e => setStartDate(e.target.value)} required />
                        <div className="date-end">
                            {console.log('finishDate', finishDate, 'isReadOnly', isReadOnly)}
                            <input type="date"  value={finishDate} readOnly={isReadOnly} onChange={e => setFinishDate(e.target.value)} required />
                        </div>

                    </div>

                </div>
                <div className="rating-grid">
                    <div className="rating-item">
                        Rating: {stars}
                    </div>

                </div>

                {!isReadOnly && <button type="submit" className="submit-button" onClick={(e) => { handleSubmit(e) }}>Submit</button>}


            </>
        )
    }

    useEffect(() => {
       
        getInfoFromFirebase()
        // if(props.id === undefined){
        //     console.log('read only is false')
        //     setIsReadOnly(false)
        // }
        // else{
        //     setIsReadOnly(true)
        //     console.log('  read only is true')
        // }
       
        console.log(props.id, 'props.id')
        star(rating)
        handleOverallData()
       


    }, [rating,bookNumber, title, author, startDate, finishDate, ])
    return (
        <>
            {overallData}
        </>

    );
}
