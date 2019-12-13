import React from "react";
import ReactDOM from "react-dom";
import MyForm from "./Form";


function App() {
  return (
    <div className="App">
      <MyForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;