import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ChatPage from "./pages/ChatPage";
import PerformListPage from "./pages/PerformListPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import BandPage from "./pages/BandPage";
import PerformPage from "./pages/PerformPage";
import PerformReservePage from "./pages/PerformReservePage";
import StagePage from "./pages/StagePage";
import StageListPage from "./pages/StageListPage";
import BandProfilePage from "./pages/BandProfilePage";

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
  },
  {
    path: "/band",
    element: <BandPage/>,
  },
  {
    path: "/perform/4",
    element: <PerformPage/>,
  },
  {
    path: "/perform-reserve",
    element: <PerformReservePage/>,
  },
  {
    path: "/stage",
    element: <StagePage/>,
  },
  {
    path: "/stage-list",
    element: <StageListPage/>,
  },
  {
    path: "/band-profile",
    element: <BandProfilePage/>,
  },
]);

export default router;