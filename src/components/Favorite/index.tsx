import React, { useState } from "react";
import FavouriteList from "./FavouriteList";
import ArticleReadMore from "../Article/ArticleReadMore";
import { Article } from "../../context/Article/types";
import { useTranslation } from "react-i18next";
const FavoriteContainer: React.FC = () => {
  const [selectedFavouriteArticle, setSelectedFavouriteArticle] =
    useState<Article | null>(null);

  const handleFavouriteArticleClick = (article: Article) => {
    setSelectedFavouriteArticle(article);
  };

  const handleCloseReadMore = () => {
    setSelectedFavouriteArticle(null);
  };

  const { t } = useTranslation();


  return (
    <div className="px-4 bg-gray-300 border ">
      <h2 className="mt-4 text-xl font-bold text-left">{t('favourites')}</h2>
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
