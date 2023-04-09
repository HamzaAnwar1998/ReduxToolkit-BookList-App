/* eslint-disable array-callback-return */
import { createSlice } from "@reduxjs/toolkit";
import db from '../Firebase/Config';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

// add books to firestore
export const addBookToFirestore = createAsyncThunk(
    'books/addBookToFirestore',
    async (book)=>{
        const addBookRef = await addDoc(collection(db,'Books'),book);
        const newBook = { id: addBookRef.id, book };
        return newBook;
    }
);

// delete book from firestore
export const deleteBookFromFirestore = createAsyncThunk(
    'books/deleteBookFromFirestore',
    async (id) =>{
        const books = await getDocs(collection(db, 'Books'));
        for(var snap of books.docs){
            if(snap.id === id){
                await deleteDoc(doc(db,'Books',snap.id));
            }
        }
        return id;
    }
)

// delete all
export const deleteAllBooks=createAsyncThunk(
  'books/deleteAllBooks',
  async ()=>{
    const books = await getDocs(collection(db,'Books'));
    for(var snap of books.docs){
      await deleteDoc(doc(db,'Books',snap.id));
    }
    return [];
  }
)

// update book
export const updateBook = createAsyncThunk(
  'books/updateBook',
  async (editedBook)=>{
    const books = await getDocs(collection(db,'Books'));
    for(var snap of books.docs){
      if(snap.id===editedBook.id){
        const bookRef = doc(db,'Books',snap.id);
        await updateDoc(bookRef,editedBook.book);
      }
    }
    return editedBook;
  }
)

const booksSlice = createSlice({
    name: 'Books',
    initialState: {
        booksArray: [],
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchBooks.fulfilled, (state, action) => {
            state.booksArray = action.payload;
          })
          .addCase(addBookToFirestore.fulfilled, (state, action)=>{
            state.booksArray.push(action.payload);
          })
          .addCase(deleteBookFromFirestore.fulfilled,(state,action)=>{
            state.booksArray = state.booksArray.filter((book) => book.id !== action.payload);
          })
          .addCase(deleteAllBooks.fulfilled,(state,action)=>{
            state.booksArray=action.payload;
          })
          .addCase(updateBook.fulfilled,(state,action)=>{
            const { id, book } = action.payload;
            const bookIndex = state.booksArray.findIndex((book) => book.id === id);
            if (bookIndex !== -1) {
              state.booksArray[bookIndex] = { id: id, book };
            }
          })
      }
});

export default booksSlice.reducer;