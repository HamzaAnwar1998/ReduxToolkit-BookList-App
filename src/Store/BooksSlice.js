import { createSlice } from "@reduxjs/toolkit";
import db from '../Firebase/Config';
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
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

  // delete book
  export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async(id)=>{
      const books = await getDocs(collection(db,'Books'));
      for(var snap of books.docs){
        if(snap.id === id){
          await deleteDoc(doc(db,'Books',snap.id));
        }
      }
      return id;
    }
  );

// delete all books
export const deleteAllBooks=createAsyncThunk(
  'books/deleteAllBooks',
  async()=>{
    const books = await getDocs(collection(db,'Books'));
    for(var snap of books.docs){
      await deleteDoc(doc(db,'Books',snap.id));
    }
    return [];
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
          .addCase(deleteBook.fulfilled,(state,action)=>{
            state.booksArray = state.booksArray.filter((book)=>book.id !== action.payload);
          })
          .addCase(deleteAllBooks.fulfilled,(state,action)=>{
            state.booksArray = action.payload;
          })
      }
});

export default booksSlice.reducer;