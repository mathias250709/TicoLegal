import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import CambioDivisas from "./components/CambioDivisas";
import Leyes from "./components/Leyes";
import Calculos from "./components/Calculos";
import Formularios from "./components/Formularios";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "divisas", Component: CambioDivisas },
      { path: "leyes", Component: Leyes },
      { path: "calculos", Component: Calculos },
      { path: "formularios", Component: Formularios },
      { path: "formularios/:id", Component: Formularios },
    ],
  },
]);