import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import PostCard from "../components/Postcard.jsx";

const Posts = () => {

    const [posts, setPosts] = useState([]);

    const removePost = (id) => {

        setPosts((prevPosts) =>
            prevPosts.filter(
                (post) => post._id !== id
            )
        );
    };

    return (

        <Container className="mt-5">

            <h2 className="mb-4">
                Posts
            </h2>

            {posts.map((post) => (

                <PostCard
                    key={post._id}
                    post={post}
                    onDelete={removePost}
                />

            ))}

        </Container>
    );
};

export default Posts;