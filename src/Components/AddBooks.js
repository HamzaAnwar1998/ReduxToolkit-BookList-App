import React,{useState} from 'react'

export const AddBooks = () => {

    // add book states
    const [isbn, setIsbn] = useState('');
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');

    // add book event
    const handleAddBook = (e) =>{
        e.preventDefault();
        let book={
            isbn,author,title
        }
        // dispatch function
        // clearing form
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
