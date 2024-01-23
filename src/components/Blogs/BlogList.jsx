import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const BlogList = ({ blogPosts }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h2 className="text-center mb-4">Latest Blog Posts</h2>
          {blogPosts.map((post) => (
            <div key={post.id} className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content.substring(0, 150)}...</p>
                <p className="card-text">
                  <small className="text-muted">Published on {post.date}</small>
                </p>
                <Link to={`/blog/${post.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
