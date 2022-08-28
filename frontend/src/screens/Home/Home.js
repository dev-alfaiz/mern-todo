import * as React from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";

import { getAllTodos } from "../../app/slices/todoSlice";
import { TodoList } from "../../components";

export const Home = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoReducer.todos);

  React.useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  return (
    <div className="home-page">
      <TodoList data={todos} />
    </div>
  );
};
