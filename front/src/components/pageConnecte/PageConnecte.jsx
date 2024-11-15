import React from "react";
import InsertFiles from "../InsertFiles/InsertFiles";
import GetFiles from "../GetFiles/GetFiles";
import "./PageConnecte.css";

const PageConnecte = () => {
  return (
    <div className="page-connecte">
      <GetFiles/>
      <InsertFiles />
    </div>
  );
};

export default PageConnecte;