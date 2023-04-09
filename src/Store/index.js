import { configureStore } from "@reduxjs/toolkit";
import booksReducer from './BooksSlice';

const store = configureStore({
    reducer:{
        books: booksReducer,
    }
});

export default store;