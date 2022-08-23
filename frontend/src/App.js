import * as React from "react";
import "./App.css";

import { Navbar } from "./components";
import { RoutesManager } from "./routes";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <RoutesManager />
    </div>
  );
};

export default App;
