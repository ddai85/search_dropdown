import React from "react";
import SearchBox from "./SearchBox.js";

function App() {
  const searchTerms1 = ["credit card", "controller", "book", "shoes", "chair"];
  const searchTerms2 = ["banana", "apple", "orange", "pear"];

  return (
    <div className="App">
      <SearchBox searchTerms={searchTerms1} />
      <SearchBox searchTerms={searchTerms2} />
    </div>
  );
}

export default App;
