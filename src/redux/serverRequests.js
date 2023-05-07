import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    lastPostId,
    editPost,
    postFilter,
    removePost,
    createComment,
    removeComment,
    editComment,
} from "./slices/homeSlice";

const MAIN_URL = 'http://localhost:8080';

export const createPost = createAsyncThunk(
    'posts/addPost',
    async function (post, {rejectedWithValue, dispatch}) {
        try {
            const newPost = {
                title: post.title,
                username: post.userName,
            };
            const response = await axios.post(MAIN_URL + `/post`, newPost, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;
            dispatch(lastPostId(data.result.id));
            return data;
        } catch (error) {
            return rejectedWithValue(error.message);
        }
    }
);
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async function (pageNumber, {rejectWithValue}) {
        try {
            const response = await axios.get(`${MAIN_URL}/post/page/${pageNumber}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const filterAndSearchPost = createAsyncThunk(
    'posts/fetchPosts',
    async function (value, {rejectWithValue, dispatch}) {
        try {
            const response = await axios.get(`${MAIN_URL}/post/search/${value}`);
            const data = response.data;
            dispatch(postFilter(data.result));
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async function (id, {rejectWithValue, dispatch}) {
        try {
            await axios.delete(`${MAIN_URL}/post/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            dispatch(removePost(id));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const updatePost = createAsyncThunk(
    'post/update',
    async function (post, {rejectWithValue, dispatch}) {
        try {
            const response = await axios.put(`${MAIN_URL}/post/${post.id}`, {
                title: post.title,
                likes: post.likes,
                dislikes: post.dislikes
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const newPostInfo = {
                id: response.data.result.id,
                title: response.data.result.title
            };
            dispatch(editPost(newPostInfo));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const createNewComment = createAsyncThunk(
    'comment/add',
    async function (comment, {rejectedWithValue, dispatch}) {
        try {
            const newComment = {
                text: comment.text,
                postId: comment.postId,
                username: comment.userName
            };
            const response = await axios.post(`${MAIN_URL}/comment`, newComment);
            const data = response.data;
            const responseComment = {
                postId: data.result.postId,
                text: data.result.text,
                userName: data.result.username,
            }
            dispatch(createComment(responseComment));
        } catch (error) {
            return rejectedWithValue(error.message);
        }
    }
);
export const updateComment = createAsyncThunk(
    'comment/update',
    async function (comment, {rejectedWithValue, dispatch}) {
        try {
            const response = await axios.put(
                `${MAIN_URL}/comment/${comment.id}`,
                {
                    text: comment.text,
                    likes: comment.likes,
                    dislikes: comment.dislikes,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = response.data;
            const newCommentInfo = {
                id: data.result.postId,
                text: data.result.text,
                comId: data.result.id,
            };
            dispatch(editComment(newCommentInfo));
        } catch (error) {
            return rejectedWithValue(error.message);
        }
    }
);

export const deleteComment = createAsyncThunk(
    'comment/delete',
    async function (idObj, {rejectedWithValue, dispatch}) {
        try {
            await axios.delete(MAIN_URL + `/comment/${idObj.id}`);
            dispatch(removeComment(idObj));
        } catch (error) {
            return rejectedWithValue(error.message);
        }
    }
);

export const uploadNewPostImage = createAsyncThunk(
    'posts/addImage',
    async function (post, {rejectedWithValue}) {
        try {
            const response = await fetch(MAIN_URL + `/post/${post.id}/picture`, {
                method: 'Post',
                body: post.file,

            });
            if (!response.ok) {
                throw new Error(`Server error`);
            }
            return await response.json();
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)
