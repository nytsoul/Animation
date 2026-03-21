import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { CharacterSelect } from "./pages/CharacterSelect";
import { Episode } from "./pages/Episode";
import { Dashboard } from "./pages/Dashboard";
import { Ending } from "./pages/Ending";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/select-role",
    Component: CharacterSelect,
  },
  {
    path: "/episode/:id",
    Component: Episode,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/ending/:type",
    Component: Ending,
  },
]);
