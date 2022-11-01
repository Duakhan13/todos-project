/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  todosList: [],
  isLoading: false,
};

export const getTodos = createAsyncThunk("todos//getTodos", async (name, thunkAPI) => {
  const url = "https://jsonplaceholder.typicode.com/todos";
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    removeTodo: (state, action) => {
      const todoId = action.payload;
      state.todosList = state.todosList.filter((item) => item.id !== todoId);
    },
  },
  extraReducers: {
    [getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todosList = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action);
    },
  },
});
export const { removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
