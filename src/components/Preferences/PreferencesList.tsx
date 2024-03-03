import React, { useState, useEffect } from "react";
import { usePreferencesState } from "../../context/Preferences/context";
import { API_ENDPOINT } from "../../config/constants";

interface PreferencesListProps {
  onArticleClick: (article: any) => void;
}

const PreferencesList: React.FC<PreferencesListProps> = ({
  onArticleClick,
}) => {
  const { yourNews, isLoading, isError } = usePreferencesState();
  const auth_token = localStorage.getItem("auth_token");
  const [isEmpty, setEmpty] = useState(false);
  useEffect(() => {
    setEmpty(!yourNews || yourNews.length === 0);
  }, [yourNews]);

  const handleArticleReadMore = async (articleId: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${articleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
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
      <div className="w-full">
        {isLoading && (
          <p className="p-16 font-serif text-xl md:ps-80">Loading...</p>
        )}
        {isError && (
          <p className="p-16 font-serif text-xl md:ps-80">
            Error fetching Preferences
          </p>
        )}
        {!isLoading && !isError && (
          <div>
            {isEmpty ? (
              <h2 className="p-16 font-serif text-xl md:ps-80">
                No preferences Selected
              </h2>
            ) : (
              yourNews.map((article: any) => (
                <div
                  key={article.id}
                  className="flex flex-col p-4 my-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-md md:flex-row"
                >
                  <div className="w-full md:w-3/4">
                    <h2 className="text-lg font-medium">{article.title}</h2>
                    <h2 className="text-gray-600">{article.summary}</h2>
                    <button
                      onClick={() => handleArticleReadMore(article.id)}
                      className="flex text-center text-gray-700 cursor-pointer underline-none hover:underline hover:text-gray-900"
                    >
                      Read More...
                    </button>
                    <p className="mt-2 text-gray-600">
                      {new Date(article.date).toDateString()}
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreferencesList;
