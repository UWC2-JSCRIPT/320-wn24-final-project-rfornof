import { db,fireAuth as auth,logout,isLoggedIn } from '../../services/firebase/firebase';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from "firebase/firestore";
import './bookreview.css'
 
export function BookReviewInsert() {
  isLoggedIn(auth);
  const [bookNumber, setBookNumber] = useState(localStorage.getItem('book_number') || '');
  const [bookType, setBookType] = useState(localStorage.getItem('book_type') || '');
  const [title, setTitle] = useState(localStorage.getItem('title') || '');
  const [author, setAuthor] = useState(localStorage.getItem('author') || '');
  const [startDate, setStartDate] = useState(localStorage.getItem('start_date') || '');
  const [finishDate, setFinishDate] = useState(localStorage.getItem('finish_date') || '');
  const [rating, setRating] = useState(localStorage.getItem('rating') || '');
  const [recommendedBy, setRecommendedBy] = useState(localStorage.getItem('recommended_by') || '');
  const [pageLength, setPageLength] = useState(localStorage.getItem('page_length') || '');
  const [isFiction, setIsFiction] = useState(JSON.parse(localStorage.getItem('is_fiction')) || false);
  const [enjoyedEnding, setEnjoyedEnding] = useState(JSON.parse(localStorage.getItem('enjoyed_ending')) || false);
  const [favoriteChar, setFavoriteChar] = useState(localStorage.getItem('favorate_char') || '');
  const [readingEase, setReadingEase] = useState(localStorage.getItem('reading_ease') || '');
  const [plot, setPlot] = useState(localStorage.getItem('plot') || '');
  const [favoriteQuotes, setFavoriteQuotes] = useState(localStorage.getItem('favorite_quotes') || '');
  const [reviewNotes, setReviewNotes] = useState(localStorage.getItem('review_notes') || '');
  const [askAuthor, setAskAuthor] = useState(localStorage.getItem('ask_author') || '');
  const [isRecommended, setIsRecommended] = useState(JSON.parse(localStorage.getItem('is_recommended')) || false);

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
          recommended_by: recommendedBy,
          page_length: pageLength,
          is_fiction: isFiction,
          enjoyed_ending: enjoyedEnding,
          favorate_char: favoriteChar,
          reading_ease: readingEase,
          plot: plot,
          favorite_quotes: favoriteQuotes,
          review_notes: reviewNotes,
          ask_author: askAuthor,
          is_recommended: isRecommended
      };
      for (let key in bookData) {
        localStorage.setItem(key, bookData[key]);
    }
    const uuid = uuidv4()
     setDoc(doc(db, "review", uuid), bookData).then((doc)=>{
      console.log('sent document to review', uuid)
     })
  };

  useEffect(()=>{

    
  },[])
  return (
    <form onSubmit={handleSubmit} className="review-insert">
      <div>
        Book You Have Read
      </div>
        <label>
            Book Number:
            <input type="number" value={bookNumber} onChange={e => setBookNumber(e.target.value)} required />
        </label>
        <br/>
        <label>
            Book Type:
            <input type="text" value={bookType} onChange={e => setBookType(e.target.value)} required />
        </label>
        <br/>
        <label>
            Title:
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <br/>
        <label>
            Author:
            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required />
        </label>
        <br/>
        <label>
            Start Date:
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
        </label>
        <br/>
        <label>
            Finish Date:
            <input type="date" value={finishDate} onChange={e => setFinishDate(e.target.value)} required />
        </label>
        <br/>
        <label>
            Rating:
            <input type="number" value={rating} onChange={e => setRating(e.target.value)} required />
        </label>
        <br/>
        <label>
            Recommended By:
            <input type="text" value={recommendedBy} onChange={e => setRecommendedBy(e.target.value)} required />
        </label>
        <br/>
        <label>
            Page Length:
            <input type="number" value={pageLength} onChange={e => setPageLength(e.target.value)} required />
        </label>
        <br/>
        <label>
            Is Fiction:
            <input type="checkbox" checked={isFiction} onChange={e => setIsFiction(e.target.checked)} />
        </label>
        <br/>
        <label>
            Enjoyed Ending:
            <input type="checkbox" checked={enjoyedEnding} onChange={e => setEnjoyedEnding(e.target.checked)} />
        </label>
        <br/>
        <label>
            Favorite Character:
            <input type="text" value={favoriteChar} onChange={e => setFavoriteChar(e.target.value)} required />
        </label>
        <br/>
        <label>
            Reading Ease:
            <input type="text" value={readingEase} onChange={e => setReadingEase(e.target.value)} required />
        </label>
        <br/>
        <label>
            Plot:
            <textarea value={plot} onChange={e => setPlot(e.target.value)} required />
        </label>
        <br/>
        <label>
            Favorite Quotes:
            <textarea value={favoriteQuotes} onChange={e => setFavoriteQuotes(e.target.value)} required />
        </label>
        <br/>
        <label>
            Review Notes:
            <textarea value={reviewNotes} onChange={e => setReviewNotes(e.target.value)} required />
        </label>
        <br/>
        <label>
            Ask Author:
            <textarea value={askAuthor} onChange={e => setAskAuthor(e.target.value)} required />
        </label>
        <br/>
        <label>
            Is Recommended:
            <input type="checkbox" checked={isRecommended} onChange={e => setIsRecommended(e.target.checked)} />
        </label>
        <br/>
        <button type="submit">Submit</button>
    </form>
);
}
