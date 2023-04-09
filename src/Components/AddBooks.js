import React,{useEffect, useState} from 'react'
import { addBookToFirestore, updateBook } from '../Store/BooksSlice';
import { useDispatch } from 'react-redux';

export const AddBooks = ({bookToBeEdited}) => {

  const dispatch = useDispatch();

  // add book states
  const [isbn, setIsbn] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');

  // add book
  const handleAddBook=(e)=>{
    e.preventDefault();
    let book = {
      isbn, author, title
    }
    dispatch(addBookToFirestore(book));
    // Clear the form fields
    setIsbn('');
    setAuthor('');
    setTitle('');
  }

  // update book states
  const [editedIsbn, setEditedIsbn] = useState('');
  const [editedAuthor, setEditedAuthor] = useState('');
  const [editedTitle, setEditedTitle] = useState('');

  // updating edited states
  useEffect(()=>{
    if(bookToBeEdited!==null){
      setEditedIsbn(bookToBeEdited.book.isbn);
      setEditedAuthor(bookToBeEdited.book.author);
      setEditedTitle(bookToBeEdited.book.title);
    }
  },[bookToBeEdited])

  // update book
  const handleUpdateBook=(e)=>{
    e.preventDefault();
    let book = {
      isbn:editedIsbn, author:editedAuthor, title:editedTitle
    }
    dispatch(updateBook({id: bookToBeEdited.id, book}));
  }

  return (
    <>
      {bookToBeEdited===null?(
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

          <button type='submit' className='btn btn-success'>UPDATE</button>

        </form>
      )}
    </>
  )
}
