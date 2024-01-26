import React from "react";
import Article from "../../components/Article/index";
import FavoriteContainer from "../../components/Favorite";

const Trending: React.FC = () => {
  return (
    <div className="md:m-5 m-3">
      <h2 className="text-2xl font-semibold mb-4">Trending News</h2>
      <div className="md:grid grid-cols-3 gap-1">
        <div className="col-span-2">
          <Article />
        </div>
        <div className="md:col-span-1">
          <FavoriteContainer/>
        </div>
      </div>
    </div>
  );
};

export default Trending;
