import * as React from "react";

import { IMAGE } from "../../images";

export const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <img
        src={IMAGE.PNF}
        alt={"page-not-found"}
        style={{ width: "100%", height: "fit-content" }}
      />
    </div>
  );
};
