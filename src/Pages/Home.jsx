import React, { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CreatePost from "../components/CreatePost.jsx";
import PostCard from "../components/Postcard.jsx";
import { fetchPosts } from "../features/posts/postSlice";

const Home = () => {
  const dispatch = useDispatch();

  const posts = useSelector(
    (state) => state.posts.posts
  );

  const loading = useSelector(
    (state) => state.posts.loading
  );

  const error = useSelector(
    (state) => state.posts.error
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Container
      style={{
        maxWidth: "700px",
      }}
      className="mt-4"
    >
      <CreatePost />

      {loading && (
        <div className="text-center">
          <Spinner />
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center mt-3">
          No posts available.
        </div>
      )}

      {!loading &&
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
          />
        ))}
    </Container>
  );
};

export default Home;
