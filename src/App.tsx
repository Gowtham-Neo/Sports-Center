import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
