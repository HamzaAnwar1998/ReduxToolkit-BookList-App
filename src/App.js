import { AddBooks } from "./Components/AddBooks";
import { ViewBooks } from "./Components/ViewBooks";

function App() {
  return (
    <div className="wrapper">
      <h1>BookList-App using React, Redux ToolKit and Firebase Cloud Firestore V9</h1>
      <div className="add-and-view-books">
        <AddBooks />
        <ViewBooks />
      </div>
    </div>
  );
}

export default App;
