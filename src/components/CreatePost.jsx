import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postApi.js";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image");
      return;
    }

    if(!caption.trim()){
        toast.error("Caption cannot be empty");
        return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      formData.append("caption", caption);
      formData.append("post", file);

      const response = await createPost(formData);

      console.log("CREATE POST RESPONSE:", response);

      toast.success(response?.message || "Post created successfully!");

      // Post successfully created
      setCaption("");
      setFile(null);
      e.target.reset();

      // Go back to Home
      navigate("/home");
    } catch (error) {
      console.log("CREATE POST ERROR:", error);
      console.log("SERVER RESPONSE:", error?.response?.data);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create post",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>Create Post</Card.Title>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="What's on your mind?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>

          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Post"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreatePost;
