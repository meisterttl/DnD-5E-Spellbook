// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 60 * 24 * 30,
//     },
//     mutations: {
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["spells"] });
//       },
//     },
//   },
// });

createRoot(document.getElementById("root")!).render(<App />);
