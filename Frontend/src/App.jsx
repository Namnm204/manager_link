import "./App.css";
import { Route, Routes } from "react-router-dom";
import AddLink from "./src/pages/AddLink";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AddLink />} />
      </Routes>
    </>
  );
}

export default App;
