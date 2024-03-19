import React, { useState } from "react";
import PreferencesList from "./PreferencesList";
import ArticleReadMore from "../Article/ArticleReadMore";
import { Article } from "../../context/Article/types";

const YourNews: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleCloseReadMore = () => {
    setSelectedArticle(null);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <PreferencesList onArticleClick={handleArticleClick} />
        <ArticleReadMore
          selectedArticle={selectedArticle}
          isOpen={selectedArticle !== null}
          closeModel={handleCloseReadMore}
        />
      </div>
    </div>
  );
};

export default YourNews;
