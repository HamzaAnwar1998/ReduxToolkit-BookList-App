import { useState } from "react";
import { AddBooks } from "./Components/AddBooks";
import { ViewBooks } from "./Components/ViewBooks";

function App() {

  const [bookToBeEdited, setBookToBeEdited]=useState(null);

  // click on edit icon
  const handleEdit=(bookObj)=>{
    setBookToBeEdited(bookObj);
  }

  // click on cancel button
  const cancelUpdate=()=>{
    setBookToBeEdited(null);
  }

  return (
    <div className="wrapper">
      <h1>BookList-App using React, Redux ToolKit and Firebase Cloud Firestore V9</h1>
      <div className="add-and-view-books">
        <AddBooks bookToBeEdited={bookToBeEdited} />
        <ViewBooks 
          handleEdit={handleEdit} 
          bookToBeEdited={bookToBeEdited}
          cancelUpdate={cancelUpdate} />
      </div>
    </div>
  );
}

export default App;
