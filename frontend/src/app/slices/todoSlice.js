import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  todosAPI,
  addTodoAPI,
  deleteTodoAPI,
  updateTodoAPI,
  searchTodoAPI,
} from "../../services/api";

const initialState = {
  isFetching: false,
  todos: [],
  newAddedTodo: {},
  message: "",
};

export const getAllTodos = createAsyncThunk(
  "todo/getAllTodos",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await todosAPI();
      if (response.status === 200 || response.status === 201) {
        return fulfillWithValue(response.data.result);
      } else {
        return rejectWithValue(response);
      }
      //   return response.data.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (body, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await addTodoAPI(body);
      if (response.status === 200 || response.status === 201) {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (body, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await deleteTodoAPI(body);
      if (response.status === 200 || response.status === 201) {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/update",
  async (updateableData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await updateTodoAPI(updateableData);
      if (response.status === 200 || response.status === 201) {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchTodo = createAsyncThunk(
  "todo/search",
  async (term, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await searchTodoAPI(term);
      if (response.status === 200 || response.status === 201) {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue(response);
      }
      //   return response.data.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: {
    // Get All Todos Promise
    [getAllTodos.pending]: (state) => {
      state.isFetching = true;
    },
    [getAllTodos.fulfilled]: (state, { payload }) => {
      return { ...state, isFetching: false, todos: payload };
    },
    [getAllTodos.rejected]: (state, { payload }) => {
      return { ...state, isFetching: false, todos: payload, message: payload };
    },

    // Add Todo Promise
    [addTodo.pending]: (state) => {
      state.isFetching = true;
    },
    [addTodo.fulfilled]: (state, { payload }) => {
      return { ...state, isFetching: false, newAddedTodo: payload };
    },
    [addTodo.rejected]: (state, { payload }) => {
      return {
        ...state,
        isFetching: false,
        newAddedTodo: payload,
        message: payload,
      };
    },

    // Delete Todo Promise
    [deleteTodo.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteTodo.fulfilled]: (state, { payload }) => {
      state.message = payload;
    },
    [deleteTodo.rejected]: (state, { payload }) => {
      state.message = payload;
    },

    // Update Todo Promise
    [updateTodo.pending]: (state) => {
      state.isFetching = true;
    },
    [updateTodo.fulfilled]: (state, { payload }) => {
      state.message = payload;
    },
    [updateTodo.rejected]: (state, { payload }) => {
      state.message = payload;
    },

    // Search Todo Promise
    [searchTodo.pending]: (state) => {
      state.isFetching = true;
    },
    [searchTodo.fulfilled]: (state, { payload }) => {
      return { ...state, isFetching: false, todos: payload };
    },
    [searchTodo.rejected]: (state, { payload }) => {
      return { ...state, isFetching: false, todos: payload, message: payload };
    },
  },
});

export default todoSlice.reducer;
