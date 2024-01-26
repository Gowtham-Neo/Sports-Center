// Parent component (e.g., ArticleContainer)
import React, { useState } from "react";
import ArticlesList from "./ArticlesList";
import ArticleReadMore from "./ArticleReadMore";
import { Article  } from "../../context/Article/types";

const ArticleContainer: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(
    null
  );

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleCloseReadMore = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="overflow-x-auto">
      <ArticlesList onArticleClick={handleArticleClick} />
      <ArticleReadMore
        selectedArticle={selectedArticle}
        isOpen={selectedArticle !== null}
        closeModel={handleCloseReadMore}
      />
    </div>
  );
};

export default ArticleContainer;
