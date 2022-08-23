import * as React from "react";
import "./App.css";

import { Navbar, Footer } from "./components";
import { RoutesManager } from "./routes";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <RoutesManager />
      <Footer />
    </div>
  );
};

export default App;
