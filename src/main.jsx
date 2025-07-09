import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./app/redux/store.js";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
);
