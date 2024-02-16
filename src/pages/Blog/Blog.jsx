import React from "react";
import {
  BrowserRouter,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import { BlogList, BlogPost } from "../../components";
import { Routes } from "react-router-dom/dist";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Exploring the Future of Healthcare",
      date: "November 15, 2023",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...",
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
      <Routes>
        <Route path="/Blog" element={<BlogList blogPosts={blogPosts} />} />
        <Route
          path="/Blog/:postId"
          element={<BlogPost blogPosts={blogPosts} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Blog;
