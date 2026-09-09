import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { createPost } from "../services/postApi.js";
import { toast } from "react-toastify";

const CreatePost = ({ onPostCreated }) => {
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error("Please select an image");
            return;
        }

        if (!caption.trim()) {
            toast.error("Caption cannot be empty");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("caption", caption);
            formData.append("post", file);

            const response = await createPost(formData);

            console.log("CREATE POST RESPONSE:", response);

            // Backend response se created post
            const newPost = response?.data;

            // Home.jsx ko new post bhejo
            if (onPostCreated && newPost) {
                onPostCreated(newPost);
            }

            setCaption("");
            setFile(null);
            e.target.reset();

            toast.success(
                response?.message || "Post created successfully!"
            );

        } catch (error) {
            console.log("CREATE POST ERROR:", error);
            console.log(
                "SERVER RESPONSE:",
                error?.response?.data
            );

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create post"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>

                <Card.Title>Create Post</Card.Title>

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="What's on your mind?"
                            value={caption}
                            onChange={(e) =>
                                setCaption(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setFile(e.target.files[0])
                            }
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Post"}
                    </Button>

                </Form>

            </Card.Body>
        </Card>
    );
};

export default CreatePost;