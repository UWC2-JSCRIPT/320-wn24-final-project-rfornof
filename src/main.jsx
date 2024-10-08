import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { Home } from './routes/Home.jsx'

import {BookReviewInsert} from './routes/BookReview/BookReviewInsert';
import {BookReviewList} from './routes/BookReview/BookReviewList';
import { BookReviewView }from './routes/BookReview/BookReviewView';

import { BookLogInsert} from './routes/BookLog/BookLogInsert';
import { BookLogList } from   './routes/BookLog/BookLogList';
import { BookLogView } from   './routes/BookLog/BookLogView';
import  {Login}  from "./routes/Auth/Login";

import { BookItemInsert } from './routes/BookItem/BookItemInsert';
import { BookItemList } from './routes/BookItem/BookItemList';





const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  
  
{
  //home_page
  path: "home",
  element: <Home />,
},


{
    //book_review_insert
    path: "book_review",
    element: <BookReviewInsert idIn={undefined}/>,
},
{
  //book_review_view
  path: "/book_review_view/:bookReviewId",
  element: <BookReviewView/>,
},
{
  //book_review_list
  path: "book_review_list",
  element: <BookReviewList/>,
},
{
  //book_log_insert
  path: "book_log",
  element: <BookLogInsert />,
},
{
  //book_log_view
  path: "book_log_view/:bookId",
  element: <BookLogView />,
},
{
    //book_log_list 
  path: "book_log_list",
  element: <BookLogList />,
},
{
  //book_item_insert
  path: "book_item",
  element: <BookItemInsert />,
},

{
  //book_item_insert
  path: "book_item_list",
  element: <BookItemList />,
},



]);
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(  <React.StrictMode>
  <RouterProvider router={router} />
</React.StrictMode>);

 
;

