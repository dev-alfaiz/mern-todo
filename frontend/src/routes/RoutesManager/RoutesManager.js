import * as React from "react";
import { Routes, Route } from "react-router-dom";

import {
  AddPage,
  Home,
  Login,
  SignUp,
  UpdatePage,
  PageNotFound,
  Profile,
} from "../../screens";

export const RoutesManager = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<Home />} key={"default-page"} />
      <Route exact path={"/home"} element={<Home />} key={"home-page"} />
      <Route exact path={"/todos"} element={<Home />} key={"todos"} />
      <Route exact path={"/add-todo"} element={<AddPage />} key={"add-todo"} />
      <Route
        exact
        path={"/update-todo"}
        element={<UpdatePage />}
        key={"update-todo"}
      />
      <Route exact path={"/profile"} element={<Profile />} key={"profile"} />
      <Route exact path={"/login"} element={<Login />} key={"login"} />
      <Route exact path={"/signup"} element={<SignUp />} key={"sign-up"} />
      <Route
        exact
        path={"*"}
        element={<PageNotFound />}
        key={"page-not-found"}
      />
    </Routes>
  );
};
