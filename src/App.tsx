import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
