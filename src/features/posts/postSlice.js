import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllPosts,
  createPost as createPostApi,
  deletePost as deletePostApi,
  likeUnlikePost,
  addComment,
  deleteComment,
  updateComment,
  editCaption,
  editPost,
} from "../../services/postApi";

const initialState = {
  posts: [],
  loading: false,
  actionLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPosts();
      return response?.data || [];
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch posts"
      );
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createPostApi(formData);

      if (!response?.data) {
        throw new Error("Post was not returned by server");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create post"
      );
    }
  }
);

export const removePost = createAsyncThunk(
  "posts/removePost",
  async (id, { rejectWithValue }) => {
    try {
      await deletePostApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete post"
      );
    }
  }
);

export const toggleLike = createAsyncThunk(
  "posts/toggleLike",
  async ({ id, currentUser }, { rejectWithValue }) => {
    try {
      await likeUnlikePost(id);

      return {
        id,
        currentUser,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Like failed"
      );
    }
  }
);

export const commentOnPost = createAsyncThunk(
  "posts/commentOnPost",
  async (
    { id, comment, currentUser },
    { rejectWithValue }
  ) => {
    try {
      await addComment(id, comment);

      return {
        id,
        comment,
        currentUser,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Comment failed"
      );
    }
  }
);

export const removeComment = createAsyncThunk(
  "posts/removeComment",
  async ({ id }, { rejectWithValue }) => {
    try {
      await deleteComment(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Comment delete failed"
      );
    }
  }
);

export const updatePostComment = createAsyncThunk(
  "posts/updatePostComment",
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const response = await updateComment(id, comment);

      return {
        id,
        comment,
        response,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Comment update failed"
      );
    }
  }
);

export const updatePostCaption = createAsyncThunk(
  "posts/updatePostCaption",
  async ({ id, caption }, { rejectWithValue }) => {
    try {
      await editCaption(id, caption);

      return { id, caption };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Caption update failed"
      );
    }
  }
);

export const updatePostImage = createAsyncThunk(
  "posts/updatePostImage",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await editPost(id, formData);

      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Post update failed"
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    clearPostError: (state) => {
      state.error = null;
    },

    updatePostLocally: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );

      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createPost.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.posts.unshift(action.payload);
      })

      .addCase(createPost.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(removePost.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(removePost.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.posts = state.posts.filter(
          (post) => post._id !== action.payload
        );
      })

      .addCase(removePost.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // LIKE / UNLIKE
      .addCase(toggleLike.pending, (state) => {
        state.error = null;
      })

      .addCase(toggleLike.fulfilled, (state, action) => {
        const { id, currentUser } = action.payload;

        const post = state.posts.find(
          (item) => item._id === id
        );

        if (!post) return;

        const currentUserId =
          currentUser?._id || currentUser?.id;

        const likedIndex =
          post.likes?.findIndex(
            (user) =>
              (user?._id || user)?.toString() ===
              currentUserId?.toString()
          ) ?? -1;

        if (likedIndex !== -1) {
          post.likes.splice(likedIndex, 1);
        } else {
          post.likes = [
            ...(post.likes || []),
            currentUser,
          ];
        }
      })

      .addCase(toggleLike.rejected, (state, action) => {
        state.error = action.payload;
      })

      // COMMENT
      .addCase(commentOnPost.pending, (state) => {
        state.error = null;
      })

      .addCase(commentOnPost.fulfilled, (state, action) => {
        const {
          id,
          comment,
          currentUser,
        } = action.payload;

        const post = state.posts.find(
          (item) => item._id === id
        );

        if (!post) return;

        post.comments = [
          ...(post.comments || []),
          {
            _id: `local-${Date.now()}`,
            user: currentUser,
            name:
              currentUser?.fullName ||
              currentUser?.name ||
              currentUser?.username ||
              "User",
            comment,
          },
        ];
      })

      .addCase(commentOnPost.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE COMMENT
      .addCase(removeComment.fulfilled, (state, action) => {
        // Backend currently accepts post id and removes
        // the first comment belonging to the logged-in user.
        const post = state.posts.find(
          (item) => item._id === action.payload
        );

        if (post) {
          post.comments = post.comments || [];
        }
      })

      // UPDATE COMMENT
      .addCase(updatePostComment.fulfilled, (state, action) => {
        const { id, comment } = action.payload;

        // This endpoint currently receives the post id,
        // so keep the server operation successful without
        // guessing which comment should be changed locally.
        const post = state.posts.find(
          (item) => item._id === id
        );

        if (post) {
          post.comments = post.comments || [];
        }
      })

      // UPDATE CAPTION
      .addCase(updatePostCaption.fulfilled, (state, action) => {
        const post = state.posts.find(
          (item) => item._id === action.payload.id
        );

        if (post) {
          post.caption = action.payload.caption;
        }
      })

      // UPDATE IMAGE
      .addCase(updatePostImage.fulfilled, (state, action) => {
        if (!action.payload?._id) return;

        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );

        if (index !== -1) {
          state.posts[index] = {
            ...state.posts[index],
            ...action.payload,
          };
        }
      });
  },
});

export const {
  clearPostError,
  updatePostLocally,
} = postSlice.actions;

export default postSlice.reducer;
