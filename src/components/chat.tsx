import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
interface GeminiAIProps {
  apiKey: string;
}

const GeminiAI: React.FC<GeminiAIProps> = ({ apiKey }) => {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
      const result = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt.length > 5 ? prompt + "in 4 Lines" : prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      const data = await result.json();
      console.log("API Response:", data);
      const fullText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response text available";
      const lines = fullText.split("\n");
      const truncatedLines = lines.slice(0, 5);
      const truncatedText = truncatedLines.join("\n");

      setResponses((prevResponses) => [
        ...prevResponses,
        `User: ${prompt}`,
        `AI: ${truncatedText}`,
      ]);
      setPrompt("");
    } catch (error) {
      console.error("Error generating text:", error);
      setResponses((prevResponses) => [
        ...prevResponses,
        `User: ${prompt}`,
        `AI: Error generating text`,
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className="fixed p-4 bg-blue-500 rounded-full shadow-lg cursor-pointer bottom-4 right-4"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <FaRobot className="text-white" size={30} />
      </div>

      {isChatOpen && (
        <div className="fixed z-40 flex flex-col bg-gray-100 border border-gray-300 shadow-lg bottom-4 right-4 w-80 h-80">
          <div className="flex-1 p-4 overflow-y-auto">
            {responses.map((response, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  index % 2 === 0 ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    index % 2 === 0 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {response}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-center text-gray-500">Loading...</div>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center p-2 bg-white border-t border-gray-300"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-l-lg"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="p-2 ml-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              <IoSend />
            </button>
          </form>
          <button
            onClick={() => setIsChatOpen(false)}
            className="absolute text-gray-600 top-2 right-2 hover:text-gray-800"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GeminiAI;
