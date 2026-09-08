import React, { useEffect, useState } from "react";

import {
    Container,
    Spinner,
    Alert,
} from "react-bootstrap";

import CreatePost from "../components/CreatePost.jsx";
import PostCard from "../components/Postcard.jsx";

import { getAllPosts } from "../services/postApi";

const Home = ({ currentUser }) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchPosts = async () => {

        try {

            setLoading(true);

            const response =
                await getAllPosts();

            setPosts(response.data || []);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to fetch posts"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePostCreated = (newPost) => {

        setPosts((prev) => [
            newPost,
            ...prev,
        ]);

    };

    const handleDelete = (id) => {

        setPosts((prev) =>
            prev.filter(
                (post) => post._id !== id
            )
        );

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

            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            {!loading && posts.length === 0 && (
                <Alert variant="info">
                    No posts available.
                </Alert>
            )}

            {posts.map((post) => (

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