import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ArticlesProvider } from "./context/Article/context";

function App() {
  return (
    <>
      <ArticlesProvider>
        <RouterProvider router={router} />
      </ArticlesProvider>
    </>
  );
}

export default App;
