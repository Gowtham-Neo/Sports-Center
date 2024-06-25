import React, { useEffect, useState } from "react";
import {
  useArticlesDispatch,
  useArticlesState,
} from "../../context/Article/context";
import { fetchArticles } from "../../context/Article/action";
import SportsList from "./SportsList";
import { usePreferencesDispatch } from "../../context/Preferences/context";
import { fetchPreferencesList } from "../../context/Preferences/action";
import YourNews from "../Preferences";
import { API_ENDPOINT } from "../../config/constants";

interface ArticleListProps {
  onArticleClick: (article: any) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ onArticleClick }) => {
  const [selectedSport, setSelectedSport] = useState<string | undefined>();
  const dispatch = useArticlesDispatch();
  const preferencesDispatch = usePreferencesDispatch();
  const { articles, isLoading, isError } = useArticlesState();

  useEffect(() => {
    if (selectedSport && selectedSport !== "Your News") {
      fetchArticles(dispatch);
    } else if (selectedSport === "Your News") {
      fetchPreferencesList(preferencesDispatch);
    }
  }, [selectedSport, dispatch, preferencesDispatch]);

  const handleSportClick = (selectedSport: string) => {
    setSelectedSport(selectedSport);
  };

  const handleArticleReadMore = async (articleId: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${articleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error while Fetching");
      }
      const data = await response.json();
      onArticleClick(data);
    } catch (error) {
      console.error("Error fetching article content:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <SportsList
        onSportClick={handleSportClick}
        onYourNewsClick={() => setSelectedSport("Your News")}
      />
      <div className="w-full">
        {isLoading && (
          <p className="p-16 font-serif text-xl md:ps-80">Loading...</p>
        )}
        {isError && (
          <p className="p-16 font-serif text-xl md:ps-80">
            Error fetching Articles
          </p>
        )}
        {!isLoading && !isError && (
          <div>
            {selectedSport !== "Your News" ? (
              articles
                .filter((article: any) => article.sport.name === selectedSport)
                .map((article: any) =>
                  article.length == 0 ? (
                    <h2 key="no-articles">No articles to display</h2>
                  ) : (
                    <div
                      key={article.id}
                      className="flex flex-col-reverse p-4 my-4 mt-4 bg-white border border-gray-300 rounded-lg shadow-md md:flex-row"
                    >
                      <div className="w-full md:w-3/4">
                        <h2 className="mt-5 text-lg font-medium">
                          {article.title}
                        </h2>
                        <h2 className="text-gray-600">{article.summary}</h2>
                        <button
                          id="btn"
                          onClick={() => handleArticleReadMore(article.id)}
                          className="flex px-6 py-2 mt-2 text-center text-white border rounded-md cursor-pointer w-max underline-none bg-slate-800 btn"
                        >
                          Read More
                        </button>
                        <p className="mt-2 text-gray-600">
                          {new Date(article.date).toDateString()}
                        </p>
                      </div>
                      <div className="w-full mt-4 md:h-40 md:w-1/4 md:mt-0 h-80">
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="object-cover w-full h-full mb-5 shadow-lg rounded-xl shadow-black"
                        />
                      </div>
                    </div>
                  )
                )
            ) : (
              <YourNews key="your-news" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
