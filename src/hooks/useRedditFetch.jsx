// src/hooks/useRedditFetch.js
import { useEffect, useState } from "react";

export default function useRedditFetch(subreddit) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subreddit) return;

    setLoading(true);
    fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=10`)
      .then((res) => res.json())
      .then((data) => {
        const posts = data.data.children.map((child) => child.data);
        setPosts(posts);
        setLoading(false);
        console.log(data.data);
      })
      .catch((err) => {
        console.error("Reddit fetch error:", err);
        setPosts([]);
        setLoading(false);
      });
  }, [subreddit]);

  return { posts, loading };
}
