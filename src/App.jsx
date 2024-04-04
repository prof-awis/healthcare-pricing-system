import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import {
  About,
  AdminPanel,
  Blog,
  Dashboard,
  Hospitals,
  Login,
  Pricing,
  SignUp,
} from "./pages";
import { BlogList, BlogPost, Footer, Navbar } from "./components";

function App() {
  const blogPosts = [
    {
      id: 1,
      title: "Exploring the Future of Healthcare",
      date: "November 15, 2023",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ... lorem45 ",
    },
    {
      id: 2,
      title: "The Impact of Technology on Medical Procedures",
      date: "October 28, 2023",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    // Add more blog posts as needed
  ];

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/About" element={<About />} />
        <Route path="/Blog" element={<BlogList blogPosts={blogPosts} />} />
        <Route
          path="/Blog/:postId"
          element={<BlogPost blogPosts={blogPosts} />}
        />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Hospitals" element={<Hospitals />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
