import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ChatPage from "./pages/ChatPage";
import PerformListPage from "./pages/PerformListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/perform",
    element: <PerformListPage />,
  },
]);

export default router;