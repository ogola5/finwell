import React, { useState } from "react";
import InteractiveButtons from "./InteractiveButtons";

const BlogPost = ({ post, onUpdatePost }) => {
  const [currentPost, setCurrentPost] = useState(post);

  const handleLike = () => {
    const updatedPost = { ...currentPost, likes: currentPost.likes + 1 };
    setCurrentPost(updatedPost);
    onUpdatePost(updatedPost);
  };

  const handleDislike = () => {
    const updatedPost = { ...currentPost, dislikes: currentPost.dislikes + 1 };
    setCurrentPost(updatedPost);
    onUpdatePost(updatedPost);
  };

  const handleFollow = () => {
    const updatedPost = { ...currentPost, isFollowed: !currentPost.isFollowed };
    setCurrentPost(updatedPost);
    onUpdatePost(updatedPost);
  };

  const handleSubscribe = () => {
    const updatedPost = {
      ...currentPost,
      isSubscribed: !currentPost.isSubscribed,
    };
    setCurrentPost(updatedPost);
    onUpdatePost(updatedPost);
  };

  return (
    <div className="blog-post">
      <h4>@{currentPost.username}</h4>
      <p>{currentPost.post}</p>
      <InteractiveButtons
        post={currentPost}
        onLike={handleLike}
        onDislike={handleDislike}
        onFollow={handleFollow}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default BlogPost;
