import axios from "axios";

const API = "http://localhost:5000/api/v1/posts";

// GET ALL POSTS
export const getAllPosts = async () => {
    const response = await axios.get(
        `${API}/get-all-posts`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

// CREATE POST
export const createPost = async (formData) => {
    const response = await axios.post(
        `${API}/create-post`,
        formData,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

// DELETE POST
export const deletePost = async (id) => {
    const response = await axios.delete(
        `${API}/delete-post/${id}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

// LIKE / UNLIKE
export const likeUnlikePost = async (id) => {
    const response = await axios.patch(
        `${API}/like-unlike-post/${id}`,
        {},
        {
            withCredentials: true,
        }
    );

    return response.data;
};

// ADD COMMENT
export const addComment = async (id, comment) => {
    const response = await axios.post(
        `${API}/comment-on-post/${id}`,
        { comment },
        {
            withCredentials: true,
        }
    );

    return response.data;
};

// DELETE COMMENT
export const deleteComment = async (id) => {
    const response = await axios.delete(
        `${API}/delete-comment-on-post/${id}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

// UPDATE COMMENT
export const updateComment = async (id, comment) => {
    const response = await axios.put(
        `${API}/update-comment-on-post/${id}`,
        { comment },
        {
            withCredentials: true,
        }
    );

    return response.data;
};

// EDIT CAPTION
export const editCaption = async (id, caption) => {
    const response = await axios.put(
        `${API}/edit-caption-on-post/${id}`,
        { caption },
        {
            withCredentials: true,
        }
    );

    return response.data;
};

// EDIT IMAGE
export const editPost = async (id, formData) => {
    const response = await axios.put(
        `${API}/edit-post/${id}`,
        formData,
        {
            withCredentials: true,
        }
    );

    return response.data;
};