import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { About, Blog, Dashboard, Login, SignUp } from "./pages";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/About" element={<About />} />
        <Route path="/Blog" element={<Blog />} />

    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
