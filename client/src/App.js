import { NavBar } from "./components";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </>
  );
}

export default App;
