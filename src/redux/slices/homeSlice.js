import { createSlice} from "@reduxjs/toolkit";
import {
    deleteComment,
    deletePost,
    createNewComment,
    createPost,
    fetchPosts,
    filterAndSearchPost,
    updateComment,
    updatePost,
    uploadNewPostImage
} from "../serverRequests";

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

const HomeSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: true,
        error: null,
        pageNumber: 1,
    },
    reducers: {
        lastPostId(state, action) {
            state.id = action.payload
        },
        editPost(state, action) {
            const postToChange = state.posts.find(post => post.id === action.payload.id);
            if (postToChange) {
                postToChange.title = action.payload.title;
            }
        },
        changePage(state, action) {
            state.pageNumber = action.payload;
        },
        postFilter(state, action) {
            state.posts = action.payload
        },
        removePost(state, action) {
            state.posts = state.posts.filter(post => post.id !== action.payload)
        },
        editLikesPost(state, action) {
            const postToUpdate = state.posts.find(post => post.id === action.payload.id);
            if (postToUpdate) {
                const userIndex = postToUpdate.likes.indexOf(action.payload.user);
                if (userIndex >= 0) {
                    postToUpdate.likes.splice(userIndex, 1);
                } else {
                    postToUpdate.likes.push(action.payload.user);
                }
            }
        },
        editDisLikesPost(state, action) {
            const postIndex = state.posts.findIndex(post => post.id === action.payload.id);
            if (postIndex !== -1) {
                state.posts[postIndex].dislikes.includes(action.payload.user)
                    ? state.posts[postIndex].dislikes = state.posts[postIndex].dislikes.filter(user => user !== action.payload.user)
                    : state.posts[postIndex].dislikes.push(action.payload.user);
            }
        },
        editLikesComment(state, action) {
            const { postId, comId, userName } = action.payload;
            const post = state.posts.find((post) => post.id === postId);
            if (post) {
                const comment = post.comments.find((comment) => comment.id === comId);
                if (comment && !comment.likes.includes(userName)) {
                    comment.likes.push(userName);
                }
            }
        },
        editDisLikesComments(state, action) {
            const { postId, comId, userName } = action.payload;
            const postToUpdate = state.posts.find(post => post.id === postId);
            if (!postToUpdate) return;

            const commentToUpdate = postToUpdate.comments.find(comment => comment.id === comId);
            if (!commentToUpdate) return;

            if (commentToUpdate.likes.includes(userName)) {
                commentToUpdate.likes.splice(commentToUpdate.likes.indexOf(userName), 1);
            } else if (!commentToUpdate.dislikes.includes(userName)) {
                commentToUpdate.dislikes.push(userName);
            }
        },
        createComment(state, action) {
            const { postId, text, userName } = action.payload;
            const newComment = {
                id: Date.now(),
                text: text,
                postId: postId,
                username: userName,
                date: new Date().getTime(),
                dislikes: [],
                likes: [],
            };
            state.posts.forEach(post => {
                if (post.id === postId) {
                    post.comments.push(newComment);
                }
            });
        },
        removeComment(state, action) {
            const { postId, id } = action.payload;
            const post = state.posts.find((post) => post.id === postId);
            if (post) {
                post.comments = post.comments.filter((comment) => comment.id !== id);
            }
        },
        editComment(state, action) {
            const { id, comId, text } = action.payload;
            const post = state.posts.find(post => post.id === id);
            if (post) {
                const comment = post.comments.find(comment => comment.id === comId);
                if (comment) {
                    comment.text = text;
                }
            }
        },
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.posts = action.payload.result;
        },
        [createPost.rejected]: setError,
        [fetchPosts.rejected]: setError,
        [updatePost.rejected]: setError,
        [deletePost.rejected]: setError,
        [filterAndSearchPost.rejected]: setError,
        [createNewComment.rejected]: setError,
        [deleteComment.rejected]: setError,
        [updateComment.rejected]: setError,
        [uploadNewPostImage.rejected]: setError,
    }
});

export const {
    lastPostId,
    editPost,
    changePage,
    postFilter,
    removePost,
    editLikesPost,
    editDisLikesPost,
    editLikesComment,
    editDisLikesComments,
    createComment,
    removeComment,
    editComment,
} = HomeSlice.actions;
export default HomeSlice.reducer;
