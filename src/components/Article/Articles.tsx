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
  const [selectedSport, setSelectedSport] = useState<string>();

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
            <p className="pt-10 font-serif text-xl ps-96">Loading...</p>
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
                    className="flex flex-col p-4 my-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-md md:flex-row"
                  >
                    <div className="w-full md:w-3/4">
                      <h2 className="text-lg font-medium">{article.title}</h2>
                      <h2 className="text-gray-600">{article.summary}</h2>
                      <button
                        className="flex text-center text-gray-700 cursor-pointer underline-none hover:underline hover:text-gray-900"
                      >
                        Read More...
                      </button>
                      <p className="mt-2 text-gray-600">
                        {new Date(article.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="w-full mt-4 md:w-1/4 md:mt-0">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="shadow-lg rounded-xl shadow-black"
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