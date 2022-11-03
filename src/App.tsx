import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DogsContainer from "./components/DogsContainer";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dog Collage
            </h1>
            <br />
            <DogsContainer />
          </div>
        </header>
      </div>
    </QueryClientProvider>
  );
};

export default App;
