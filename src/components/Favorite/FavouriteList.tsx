import { API_ENDPOINT } from "../../config/constants";
import React, { useEffect, useState } from "react";

import TeamList from "./TeamList";
import { Article, Team } from "../../context/Article/types";

interface FavouriteArticleListProps {
  onFavouriteArticleClick: (article: any) => void;
}

const FavouriteArticleList: React.FC<FavouriteArticleListProps> = ({
  onFavouriteArticleClick,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<string>();
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleTeamClick = (selectedTeam: string) => {
    setSelectedTeam(selectedTeam);
  };

  const handleArticleReadMore = async (articleId: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${articleId}`);

      if (!response.ok) {
        throw new Error("Error while Fetching");
      }

      const data = await response.json();
      onFavouriteArticleClick(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching article content:", error);
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_ENDPOINT}/articles`);
        if (!response.ok) {
          throw new Error("Error while fetching articles");
        }
        const data = await response.json();

        const filteredArticles = data.filter((article: Article) =>
          article.teams.some((team: Team) => team.name === selectedTeam)
        );

        setArticles(filteredArticles);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [selectedTeam]);

  return (
    <div className="flex flex-col mt-5">
      <TeamList onTeamClick={handleTeamClick} />
      <div className="w-full">
        {isLoading && (
          <p className="pt-10 font-serif text-xl md:ps-36">Loading...</p>
        )}
        {isError && (
          <p className="pt-10 font-serif text-xl md:ps-36">
            Error fetching Articles
          </p>
        )}
        {!isLoading && !isError && (
          <div>
            {articles.map((article: any) => (
              <div
                key={article.id}
                className="flex flex-col p-4 my-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-md md:flex-row"
              >
                <div className="w-full">
                  <h2 className="text-lg font-medium">{article.title}</h2>
                  <h2 className="text-gray-600">{article.summary}</h2>
                  <p className="mt-2 text-gray-600">
                    {new Date(article.date).toDateString()}
                  </p>
                  <button
                    onClick={() => handleArticleReadMore(article.id)}
                    className="flex px-12 py-2 mt-4 text-center text-white border rounded-md cursor-pointer w-max underline-none bg-slate-800 "
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouriteArticleList;
