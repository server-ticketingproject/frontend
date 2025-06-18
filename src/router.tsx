import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ChatPage from "./pages/ChatPage";
import PerformListPage from "./pages/PerformListPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SignupPage";
import BandPage from "./pages/BandPage";
import PerformPage from "./pages/PerformPage";
import PerformReservePage from "./pages/PerformReservePage";
import StagePage from "./pages/StagePage";
import StageListPage from "./pages/StageListPage";
import BandIntroducePage from "./pages/BandIntroducePage";
import BandProfilePage from "./pages/ProfilePage/band";
import MemberPage from "./pages/ProfilePage/member";
import StageMainPage from "./pages/StageMainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <ChatPage />
  },
  {
    path: "/performList",
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
    path: "/perform/:encoded",
    element: <PerformPage />,
  },  
  {
    path: "/perform-reserve/:encoded",
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
    path: "/band-introduce",
    element: <BandIntroducePage/>,
  },
  {
    path: "/band-profile",
    element: <BandProfilePage/>,
  },
  {
    path: "/member-profile",
    element: <MemberPage/>,
  },
  {
    path: "/stage-main",
    element: <StageMainPage/>,
  },
]);

export default router;