import React from "react";
import ArticleList from "./Articles";

const Article: React.FC = () => {
  return (
    <div className=" overflow-x-auto ">
      <ArticleList/>
    </div>
  );
};

export default Article;
