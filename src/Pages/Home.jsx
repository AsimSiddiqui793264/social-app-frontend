import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import CreatePost from "../components/CreatePost.jsx";
import PostCard from "../components/Postcard.jsx";
import { getAllPosts } from "../services/postApi";

const Home = ({ currentUser }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            setLoading(true);

            const response = await getAllPosts();

            setPosts(response.data || []);

            // Success toaster
            toast.success("Posts loaded successfully!");
        } catch (error) {
            console.error("Get Posts Error:", error);

            const errorMessage =
                error.response?.data?.message ||
                "Failed to fetch posts";

            // Error toaster
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePostCreated = (newPost) => {
        setPosts((prev) => [newPost, ...prev]);

        // Success toaster
        toast.success("Post created successfully!");
    };

    const handleDelete = (id) => {
        setPosts((prev) =>
            prev.filter((post) => post._id !== id)
        );

        // Success toaster
        toast.success("Post deleted successfully!");
    };

    return (
        <Container
            style={{
                maxWidth: "700px",
            }}
            className="mt-4"
        >
            <CreatePost
                onPostCreated={handlePostCreated}
            />

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
                        currentUser={currentUser}
                        onDelete={handleDelete}
                    />
                ))}
        </Container>
    );
};

export default Home;