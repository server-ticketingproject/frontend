import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ChatPage from "./pages/ChatPage";
import PerformListPage from "./pages/PerformListPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";

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
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signin",
    element: <SigninPage/>,
  }
]);

export default router;