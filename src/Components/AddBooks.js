import React,{ useState } from 'react'
import { addBookToFirestore } from '../Store/BooksSlice';
import { useDispatch } from 'react-redux';

export const AddBooks = () => {

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
    // dispatch action
    dispatch(addBookToFirestore(book));
    // Clear the form fields
    setIsbn('');
    setAuthor('');
    setTitle('');
  }

  return (
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
  )
}
