import React from "react";
import useRedditFetch from "../hooks/useRedditFetch";

export default function Feed({ sources }) {
  return (
    <div className="feed-container">
      <h3 className="feed-title">Your Feed</h3>
      {sources.length === 0 ? (
        <p className="feed-empty">No sources added.</p>
      ) : (
        sources.map((source, index) => {
          const subreddit = source.startsWith("r/") ? source.slice(2) : source;
          return <RedditPosts key={index} subreddit={subreddit} />;
        })
      )}
    </div>
  );
}

function RedditPosts({ subreddit }) {
  const { posts, loading } = useRedditFetch(subreddit);

  return (
    <div className="reddit-section">
      <h4 className="reddit-title">r/{subreddit}</h4>
      {loading ? (
        <p className="reddit-loading">Loading...</p>
      ) : (
        <ul className="reddit-list">
          {posts.map((post) => (
            <li key={post.id} className="reddit-list-item">
              <a
                href={`https://reddit.com${post.permalink}`}
                target="_blank"
                rel="noreferrer"
                className="reddit-link"
              >
                <p className="reddit-post-title">{post.title}</p>
                <p className="reddit-post-meta">
                  👍 {post.ups} | 💬 {post.num_comments}
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
