import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
    likeUnlikePost,
    addComment,
    deletePost
} from "../services/postApi";

const PostCard = ({ post, currentUser, onDelete }) => {

    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    // Local post state
    const [currentPost, setCurrentPost] = useState(post);

    // LIKE / UNLIKE
    const handleLike = async () => {
        try {
            const response = await likeUnlikePost(currentPost._id);

            console.log("LIKE RESPONSE:", response);

            // Agar backend updated post return karta hai
            if (response?.data) {
                setCurrentPost(response.data);
            } else {
                // Agar backend post return nahi karta
                setCurrentPost((prev) => {
                    const alreadyLiked = prev.likes?.some(
                        (user) => user._id === currentUser?._id
                    );

                    return {
                        ...prev,
                        likes: alreadyLiked
                            ? prev.likes.filter(
                                (user) =>
                                    user._id !== currentUser?._id
                            )
                            : [
                                ...(prev.likes || []),
                                currentUser
                            ],
                    };
                });

toast.success(
    isLiked
        ? "Post unliked successfully!"
        : "Post liked successfully!"
);

            }

        } catch (error) {
            console.error("LIKE ERROR:", error);

            alert(
                error?.response?.data?.message ||
                "Like failed"
            );
        }
    };

    // ADD COMMENT
    const handleComment = async (e) => {
        e.preventDefault();

        if (!comment.trim()) return;

        try {
            setLoading(true);

            const response = await addComment(
                currentPost._id,
                comment
            );

toast.success("Comment added successfully!");

            console.log("COMMENT RESPONSE:", response);

            setComment("");

            // Backend updated post return karta ho
            if (response?.data) {
                setCurrentPost(response.data);
            } else {
                // Fallback: locally comment add
                const newComment = {
                    _id: Date.now(),
                    name:
                        currentUser?.name ||
                        currentUser?.fullName ||
                        currentUser?.username ||
                        "User",
                    comment: comment,
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
            console.error("COMMENT ERROR:", error);

            alert(
                error?.response?.data?.message ||
                "Comment failed"
            );
        } finally {
            setLoading(false);
        }
    };

    // DELETE POST
    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmDelete) return;

        try {

            await deletePost(currentPost._id);

            onDelete(currentPost._id);

        } catch (error) {

            alert(
                error?.response?.data?.message ||
                "Delete failed"
            );
        }
    };

    const isLiked = currentPost.likes?.some(
        (user) =>
            user._id === currentUser?._id
    );

    const isOwner =
        currentPost.owner?._id === currentUser?._id;

    return (
        <Card className="mb-4 shadow-sm">

            <Card.Body>

                {/* USER */}
                <div className="d-flex justify-content-between mb-3">

                    <div>
                        <strong>
                            {currentPost.owner?.name}
                        </strong>

                        <br />

                        <small className="text-muted">
                            {currentPost.owner?.email}
                        </small>
                    </div>

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

                {/* IMAGE */}
                <Card.Img
                    src={currentPost.post?.secure_url}
                    alt="Post"
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />

                {/* CAPTION */}
                <Card.Text className="mt-3">
                    {currentPost.caption}
                </Card.Text>

                {/* LIKE */}
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

                {/* COMMENTS */}
                <hr />

                <h6>Comments</h6>

                {currentPost.comments?.map(
                    (item, index) => (
                        <div
                            key={
                                item._id || index
                            }
                            className="border rounded p-2 mb-2"
                        >
                            <strong>
                                {item.name}
                            </strong>

                            <p className="mb-0">
                                {item.comment}
                            </p>
                        </div>
                    )
                )}

                {/* ADD COMMENT */}
                <Form onSubmit={handleComment}>

                    <div className="d-flex gap-2">

                        <Form.Control
                            type="text"
                            placeholder="Write a comment..."
                            value={comment}
                            onChange={(e) =>
                                setComment(
                                    e.target.value
                                )
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