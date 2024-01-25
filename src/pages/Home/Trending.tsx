import React from "react";
import Article from "../../components/Article/index";

const Trending: React.FC = () => {
  return (
    <div className="m-5">
      <h2 className="text-2xl font-semibold mb-4">Trending News</h2>
      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-2">
          <Article />
        </div>
        <div className="col-span-1">
        </div>
      </div>
    </div>
  );
};

export default Trending;
