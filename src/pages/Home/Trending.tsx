import React from "react";
import Article from "../../components/Article/index";
import FavoriteContainer from "../../components/Favorite";
import { useTranslation } from "react-i18next";

const Trending: React.FC = () => {
  const { t, } = useTranslation();
  return (
    <div className="m-3 md:m-5">
      <div className="flex flex-row justify-evenly">
        <h2 className="mb-4 text-2xl font-semibold">{t("trendingNews")}</h2>
       
      </div>
      <div className="grid-cols-3 gap-1 md:grid">
        <div className="col-span-2">
          <Article />
        </div>
        <div className="md:col-span-1">
          <FavoriteContainer />
        </div>
      </div>
    </div>
  );
};

export default Trending;
