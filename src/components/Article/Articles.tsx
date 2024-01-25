import React, { useEffect, useState } from "react";
import {
    useArticlesDispatch,
    useArticlesState,
} from "../../context/Article/context";
import { fetchArticles } from "../../context/Article/action";
import SportsList from "./SportsList";
// import FavoriteComponent from "./FavoriteComponent";
// import ReadMoreDialog from "./ReadMoreDialog";

const ArticleList: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const articlesDispatch = useArticlesDispatch();
  const articlesState = useArticlesState();
  const { articles, isLoading } = articlesState;

  useEffect(() => {
    if (selectedSport) {
      fetchArticles(articlesDispatch);
    }
  }, [selectedSport, articlesDispatch]);

  const handleSportClick = (selectedSport: string) => {
    setSelectedSport(selectedSport);
  };

  return (
    
      <div className="flex flex-col">
        <SportsList onSportClick={handleSportClick} />
        <div className="w-full">
          {isLoading ? (
            <p className=" font-serif text-xl pt-10 ps-96">Loading...</p>
          ) : (
            <div>
              {articles
                .filter((article: any) =>
                  selectedSport
                    ? article.sport.name === selectedSport
                    : true
                )
                .map((article: any) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row my-4 border border-gray-300"
                  >
                    <div className="w-full md:w-3/4">
                      <h2 className="text-lg font-medium">{article.title}</h2>
                      <h2 className="text-gray-600">{article.summary}</h2>
                      <button
                        className="flex text-gray-700 underline-none hover:underline hover:text-gray-900 cursor-pointer  text-center"
                      >
                        Read More...
                      </button>
                      <p className="text-gray-600 mt-2">
                        {new Date(article.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="w-full md:w-1/4 mt-4 md:mt-0">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className=" rounded-xl shadow-lg shadow-black"
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
  );
};

export default ArticleList;