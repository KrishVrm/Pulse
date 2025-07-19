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

  // Helper to check if thumbnail is a valid image
  const isValidThumbnail = (thumb) =>
    thumb &&
    thumb !== "self" &&
    thumb !== "default" &&
    thumb !== "nsfw" &&
    thumb !== "image" &&
    thumb.startsWith("http");

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
                <div className="reddit-post-content">
                  {post.preview?.images?.[0]?.source?.url && (
  <img
    src={post.preview.images[0].source.url.replace(/&amp;/g, "&")}
    alt="post"
    className="reddit-post-thumb"
  />
)}

                  <div>
                    <p className="reddit-post-title">{post.title}</p>
                    <p className="reddit-post-meta">
                      👍 {post.ups} | 💬 {post.num_comments}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
