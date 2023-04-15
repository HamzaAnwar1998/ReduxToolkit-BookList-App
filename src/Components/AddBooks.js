import React,{ useEffect, useState } from 'react'
import { addBookToFirestore, updateBook } from '../Store/BooksSlice';
import { useDispatch } from 'react-redux';

export const AddBooks = ({bookToEdit}) => {

  const dispatch = useDispatch();

  // add book states
  const [isbn, setIsbn] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');

  // update book states
  const [editedIsbn, setEditedIsbn] = useState('');
  const [editedAuthor, setEditedAuthor] = useState('');
  const [editedTitle, setEditedTitle] = useState('');

  // updating update book states
  useEffect(()=>{

    if(bookToEdit!==null){
      setEditedIsbn(bookToEdit.book.isbn);
      setEditedAuthor(bookToEdit.book.author);
      setEditedTitle(bookToEdit.book.title);
    }

  },[bookToEdit])

  // add book event
  const handleAddBook=(e)=>{
    e.preventDefault();
    let book = {
      isbn, author, title
    }
    // dispatch action
    dispatch(addBookToFirestore(book));
    // Clear the form fields
    setIsbn('');
    setAuthor('');
    setTitle('');
  }

  // update book event
  const handleUpdateBook=(e)=>{
    e.preventDefault();
    let book={
      isbn: editedIsbn, author: editedAuthor, title: editedTitle
    }
    dispatch(updateBook({id: bookToEdit.id, book}));
  }

  return (
    <>
      {bookToEdit===null?(
        <form className='form-group custom-form' onSubmit={handleAddBook}>

          <label>#ISBN</label>
          <input className='form-control' required
          onChange={(e)=>setIsbn(e.target.value)} value={isbn} />
          <br />

          <label>Author</label>
          <input className='form-control' required
          onChange={(e)=>setAuthor(e.target.value)} value={author} />
          <br />

          <label>Title</label>
          <input className='form-control' required
          onChange={(e)=>setTitle(e.target.value)} value={title} />
          <br />

          <button type='submit' className='btn btn-success'>Add</button>

        </form>
      ):(
        <form className='form-group custom-form' onSubmit={handleUpdateBook}>

          <label>#ISBN</label>
          <input className='form-control' required
          onChange={(e)=>setEditedIsbn(e.target.value)} value={editedIsbn} />
          <br />

          <label>Author</label>
          <input className='form-control' required
          onChange={(e)=>setEditedAuthor(e.target.value)} value={editedAuthor} />
          <br />

          <label>Title</label>
          <input className='form-control' required
          onChange={(e)=>setEditedTitle(e.target.value)} value={editedTitle} />
          <br />

          <button type='submit' className='btn btn-success'>Update</button>

        </form>
      )}
    </>
  )
}
