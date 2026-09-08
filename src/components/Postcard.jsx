import React, { useState } from "react";

import { Card, Button, Form, Modal } from "react-bootstrap";

import { likeUnlikePost, addComment, deletePost } from "../services/postApi";

const PostCard = ({ post, currentUser, onDelete }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    try {
      await likeUnlikePost(post._id);

      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Like failed");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      setLoading(true);

      await addComment(post._id, comment);

      setComment("");

      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Comment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmDelete) return;

    try {
      await deletePost(post._id);

      onDelete(post._id);
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const isLiked = post.likes?.some((user) => user._id === currentUser?._id);

  const isOwner = post.owner?._id === currentUser?._id;

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        {/* USER */}

        <div className="d-flex justify-content-between mb-3">
          <div>
            <strong>{post.owner?.name}</strong>

            <br />

            <small className="text-muted">{post.owner?.email}</small>
          </div>

          {isOwner && (
            <Button variant="outline-danger" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>

        {/* IMAGE */}
        <Card.Img
          src={post.post.secure_url}
          alt="Post"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />

        {/* CAPTION */}

        <Card.Text className="mt-3">{post.caption}</Card.Text>

        {/* LIKE */}

        <div className="mb-3">
          <Button
            variant={isLiked ? "danger" : "outline-danger"}
            onClick={handleLike}
          >
            ❤️ {post.likes?.length || 0}
          </Button>
        </div>

        {/* COMMENTS */}

        <hr />

        <h6>Comments</h6>

        {post.comments?.map((item, index) => (
          <div key={item._id || index} className="border rounded p-2 mb-2">
            <strong>{item.name}</strong>

            <p className="mb-0">{item.comment}</p>
          </div>
        ))}

        {/* ADD COMMENT */}

        <Form onSubmit={handleComment}>
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "..." : "Comment"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
