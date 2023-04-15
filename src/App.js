import { useState } from "react";
import { AddBooks } from "./Components/AddBooks";
import { ViewBooks } from "./Components/ViewBooks";

function App() {

  const [bookToEdit, setBookToEdit] = useState(null);

  const handleEditIcon=(book)=>{
    setBookToEdit(book);
  }

  const cancelUpdate=()=>{
    setBookToEdit(null);
  }

  return (
    <div className="wrapper">
      <h1>BookList-App using React, Redux ToolKit and Firebase Cloud Firestore V9</h1>
      <div className="add-and-view-books">
        <AddBooks
          bookToEdit={bookToEdit}
        />
        <ViewBooks
          handleEditIcon={handleEditIcon}
          bookToEdit={bookToEdit}
          cancelUpdate={cancelUpdate}
        />
      </div>
    </div>
  );
}

export default App;
