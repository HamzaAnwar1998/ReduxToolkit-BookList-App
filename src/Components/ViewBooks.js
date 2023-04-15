import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllBooks, deleteBook, fetchBooks } from '../Store/BooksSlice';
import Icon from 'react-icons-kit';
import {basic_trashcan_remove} from 'react-icons-kit/linea/basic_trashcan_remove';
import {software_pencil} from 'react-icons-kit/linea/software_pencil';

export const ViewBooks = ({handleEditIcon, bookToEdit, cancelUpdate}) => {

  const data = useSelector((state)=>state.books.booksArray);

  const dispatch = useDispatch();

  // fetch books
  useEffect(()=>{
    dispatch(fetchBooks());
  },[dispatch])

  // delete book
  const handleDelete=(id)=>{
    dispatch(deleteBook(id));
  }

  // delete all books
  const deleteAll=()=>{
    dispatch(deleteAllBooks());
  }

  return (
    <div className='view-books'>
       {data.length > 0 ? (
          <>
            {data.map((newBook)=>(
                <div className='book' key={newBook.id}>
                    
                  <div className='content'>
                    <h6>{newBook.book.title} by {newBook.book.author}</h6>
                    <span>#{newBook.book.isbn}</span>
                  </div>
                  
                  <div className='actions'>
                    {bookToEdit===null&&(
                      <span className='icon red'
                        onClick={()=>handleDelete(newBook.id)}>
                        <Icon icon={basic_trashcan_remove} size={22}/>
                      </span>
                    )}
                    <span className='icon blue'
                      onClick={()=>handleEditIcon(newBook)}>
                      <Icon icon={software_pencil} size={22}/>
                    </span>
                  </div>
                  
                </div>
            ))}
            {bookToEdit===null?(
              <>
                {data.length > 1&&(
                  <button className='btn btn-danger' onClick={deleteAll}>Delete All</button>
                )}
              </>
            ):(
              <button className='btn btn-danger' onClick={cancelUpdate}>Cancel Update</button>
            )}
          </>
          ):(
            <div>There are no books added yet!</div>
          )}
      </div>
    )
  }
