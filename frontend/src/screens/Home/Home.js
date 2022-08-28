import * as React from "react";
// import moment from "moment";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";

import { getAllTodos } from "../../app/slices/todoSlice";
import { TodoList } from "../../components";

const STATIC_TODO = [
  {
    _id: "63075e90ecc0c77e19802b45",
    title: "Kabaddi at 12:00 PM",
    body: "Play with team at kshirsagar ground.",
    userId: "63075e6decc0c77e19802b43",
    __v: 0,
  },
];

export const Home = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoReducer.todos);
  // const auth = localStorage.getItem("user");
  // const authDetail = JSON.parse(auth);

  React.useEffect(() => {
    dispatch(getAllTodos());
  }, []);


  return (
    <div className="home-page">
      <TodoList data={todos} />
    </div>
  );
};
