/** @format */

import { configureStore } from "@reduxjs/toolkit";
import TodosReducer from "../features/todosSlice";

const store = configureStore({
  reducer: {
    todos: TodosReducer,
  },
});

export default store;
