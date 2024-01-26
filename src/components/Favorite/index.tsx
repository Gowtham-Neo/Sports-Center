// Parent component (e.g., ArticleContainer)
import React, { useState } from "react";
import FavouriteList from "./FavouriteList";
import ArticleReadMore from "../Article/ArticleReadMore";
import { Article } from "../../context/Article/types";

const FavoriteContainer: React.FC = () => {
  const [selectedFavouriteArticle, setSelectedFavouriteArticle] =
    useState<Article | null>(null);

  const handleFavouriteArticleClick = (article: Article) => {
    setSelectedFavouriteArticle(article);
  };

  const handleCloseReadMore = () => {
    setSelectedFavouriteArticle(null);
  };

  return (
    <div className=" border bg-gray-300 px-4">
      <h2 className="text-left text-xl font-bold mt-4">Favourites</h2>
      <FavouriteList onFavouriteArticleClick={handleFavouriteArticleClick} />
      <ArticleReadMore
        selectedArticle={selectedFavouriteArticle}
        isOpen={selectedFavouriteArticle !== null}
        closeModel={handleCloseReadMore}
      />
    </div>
  );
};

export default FavoriteContainer;
