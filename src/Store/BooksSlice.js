import { createSlice } from "@reduxjs/toolkit";
import db from '../Firebase/Config';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

// add book to firestore
export const addBookToFirestore = createAsyncThunk(
    'books/addBookToFirestore',
    async (book)=>{
        const addBookRef = await addDoc(collection(db,'Books'),book);
        const newBook = { id: addBookRef.id, book };
        return newBook;
    }
);

// fetch books
export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
      const querySnapshot = await getDocs(collection(db, 'Books'));
      const books = querySnapshot.docs.map((doc)=>({
        id: doc.id,
        book: doc.data(),
      }));
      return books;
    }
  );

const booksSlice = createSlice({
    name: 'Books',
    initialState: {
        booksArray: [],
    },
    // reducers: {
        
    // },
    extraReducers: (builder) => {
        builder
          .addCase(fetchBooks.fulfilled, (state, action) => {
            state.booksArray = action.payload;
          })
          .addCase(addBookToFirestore.fulfilled, (state, action)=>{
            state.booksArray.push(action.payload);
          })
      }
});

export default booksSlice.reducer;