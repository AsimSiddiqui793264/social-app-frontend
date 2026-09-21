import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  likeUnlikePost,
  addComment,
  deletePost,
} from "../services/postApi";

const PostCard = ({ post, currentUser, onDelete }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPost, setCurrentPost] = useState(post);

  // =========================
  // GET CURRENT USER ID
  // =========================
  const currentUserId =
    currentUser?._id ||
    currentUser?.id;

  // =========================
  // GET POST OWNER ID
  // =========================
  const ownerId =
    typeof currentPost.owner === "object"
      ? currentPost.owner?._id
      : currentPost.owner;

  // =========================
  // CHECK POST OWNER
  // =========================
  const isOwner =
    ownerId?.toString() === currentUserId?.toString();

  // =========================
  // LIKE / UNLIKE
  // =========================
  const handleLike = async () => {
    try {
      const wasLiked = currentPost.likes?.some(
        (user) =>
          user?._id?.toString() ===
          currentUserId?.toString()
      );

      const response = await likeUnlikePost(
        currentPost._id
      );

      console.log("LIKE RESPONSE:", response);

      if (response?.data) {
        setCurrentPost(response.data);
      } else {
        setCurrentPost((prev) => {
          const alreadyLiked = prev.likes?.some(
            (user) =>
              user?._id?.toString() ===
              currentUserId?.toString()
          );

          return {
            ...prev,
            likes: alreadyLiked
              ? prev.likes.filter(
                  (user) =>
                    user?._id?.toString() !==
                    currentUserId?.toString()
                )
              : [
                  ...(prev.likes || []),
                  currentUser,
                ],
          };
        });
      }

      toast.success(
        wasLiked
          ? "Post unliked successfully!"
          : "Post liked successfully!"
      );
    } catch (error) {
      console.error("LIKE ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          "Like failed"
      );
    }
  };

  // =========================
  // ADD COMMENT
  // =========================
  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    try {
      setLoading(true);

      const response = await addComment(
        currentPost._id,
        comment.trim()
      );

      console.log(
        "COMMENT RESPONSE:",
        response
      );

      toast.success(
        "Comment added successfully!"
      );

      setComment("");

      if (response?.data) {
        setCurrentPost(response.data);
      } else {
        const newComment = {
          _id: Date.now(),
          user: currentUser,
          name:
            currentUser?.fullName ||
            currentUser?.name ||
            currentUser?.username ||
            "User",
          comment: comment.trim(),
        };

        setCurrentPost((prev) => ({
          ...prev,
          comments: [
            ...(prev.comments || []),
            newComment,
          ],
        }));
      }
    } catch (error) {
      console.error(
        "COMMENT ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Comment failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE POST
  // =========================
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deletePost(currentPost._id);

      toast.success(
        "Post deleted successfully!"
      );

      if (onDelete) {
        onDelete(currentPost._id);
      }
    } catch (error) {
      console.error(
        "DELETE ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // =========================
  // CHECK LIKE
  // =========================
  const isLiked = currentPost.likes?.some(
    (user) =>
      user?._id?.toString() ===
      currentUserId?.toString()
  );

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>

        {/* =========================
            POST OWNER HEADER
        ========================= */}
        <div className="d-flex justify-content-between align-items-start mb-3">

          <div className="d-flex align-items-center gap-2">

            <img
              src={
                currentPost.owner?.avatar ||
                "https://via.placeholder.com/50"
              }
              alt="Profile"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <div>

              <strong className="d-block">
                {currentPost.owner?.fullName ||
                  "User"}
              </strong>

              <small className="text-muted d-block">
                {currentPost.owner?.username
                  ? `@${currentPost.owner.username}`
                  : ""}
              </small>

              <small className="text-muted d-block">
                {currentPost.owner?.email ||
                  ""}
              </small>

            </div>
          </div>

          {/* =========================
              DELETE BUTTON
          ========================= */}

          {isOwner && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}

        </div>

        {/* =========================
            POST IMAGE
        ========================= */}

        <Card.Img
          src={currentPost.post?.secure_url}
          alt="Post"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />

        {/* =========================
            CAPTION
        ========================= */}

        <Card.Text className="mt-3">
          {currentPost.caption}
        </Card.Text>

        {/* =========================
            LIKE BUTTON
        ========================= */}

        <div className="mb-3">

          <Button
            variant={
              isLiked
                ? "danger"
                : "outline-danger"
            }
            onClick={handleLike}
          >
            ❤️ {currentPost.likes?.length || 0}
          </Button>

        </div>

        <hr />

        {/* =========================
            COMMENTS
        ========================= */}

        <h6>Comments</h6>

        {currentPost.comments?.length > 0 ? (

          currentPost.comments.map(
            (item, index) => (

              <div
                key={
                  item._id || index
                }
                className="border rounded p-2 mb-2"
              >

                {/* COMMENT USER */}

                <div className="d-flex align-items-center gap-2">

                  <img
                    src={
                      item.user?.avatar ||
                      "https://via.placeholder.com/40"
                    }
                    alt="Profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                  <div>

                    <strong className="d-block">
                      {item.user?.fullName ||
                        item.name ||
                        "User"}
                    </strong>

                    <small className="text-muted d-block">
                      {item.user?.username
                        ? `@${item.user.username}`
                        : ""}
                    </small>

                    <small className="text-muted d-block">
                      {item.user?.email ||
                        ""}
                    </small>

                  </div>

                </div>

                {/* COMMENT TEXT */}

                <p className="mb-0 mt-2">
                  {item.comment}
                </p>

              </div>
            )
          )

        ) : (

          <p className="text-muted">
            No comments yet.
          </p>

        )}

        {/* =========================
            COMMENT FORM
        ========================= */}

        <Form onSubmit={handleComment}>

          <div className="d-flex gap-2">

            <Form.Control
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
            />

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "..."
                : "Comment"}
            </Button>

          </div>

        </Form>

      </Card.Body>
    </Card>
  );
};

export default PostCard;