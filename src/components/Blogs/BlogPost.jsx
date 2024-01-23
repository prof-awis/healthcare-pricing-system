// BlogPost.js
import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

const BlogPost = ({ blogPosts }) => {
  const { postId } = useParams(); // Get the postId from the URL params
  const post = blogPosts.find((post) => post.id === parseInt(postId, 10));

  if (!post) {
    return <div className="container mt-5">Post not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h2 className="mb-4">{post.title}</h2>
          <p className="text-muted">Published on {post.date}</p>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
