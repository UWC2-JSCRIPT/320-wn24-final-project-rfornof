import React from 'react';
import { useParams } from 'react-router-dom';
export function BookReviewView() {
  const { bookReviewId } = useParams();
  console.log('choose id',bookReviewId);
  return (
    <div>
      <h1>Pokedex VIEW {bookReviewId}</h1>
    </div>
  );
}