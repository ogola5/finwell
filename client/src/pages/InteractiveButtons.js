import React from "react";

const InteractiveButtons = ({
  post,
  onLike,
  onDislike,
  onFollow,
  onSubscribe,
}) => {
  return (
    <div className="buttons">
      <button onClick={onLike} className="like-button">
        👍 Like ({post.likes})
      </button>
      <button onClick={onDislike} className="dislike-button">
        👎 Dislike ({post.dislikes})
      </button>
      <button onClick={onFollow} className="follow-button">
        {post.isFollowed ? "✅ Followed" : "➕ Follow"}
      </button>
      <button onClick={onSubscribe} className="subscribe-button">
        {post.isSubscribed ? "🔔 Subscribed" : "🔕 Subscribe"}
      </button>
    </div>
  );
};

export default InteractiveButtons;
