import React, { useState } from "react";
import BlogPost from "./BlogPost";
import dummyPosts from "./dummyPosts";
import styles from "./BlogFeed.css"

const BlogFeed = () => {
  const [posts, setPosts] = useState(dummyPosts);

  const updatePost = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="blog-feed">
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} onUpdatePost={updatePost} />
      ))}
    </div>
  );
};

export default BlogFeed;
