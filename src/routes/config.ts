import { lazy } from "react";
import _404 from "../components/_404";
import LoginPage from "../pages/LoginPage";
import { DynamicRouteProps } from "./type";

const Dashboard = lazy(() => import("../pages/Dashboard"));

const routes: DynamicRouteProps[] = [
  {
    path: "/404",
    component: _404,
    secret: false,
  },
  {
    path: "/login",
    component: LoginPage,
    secret: false,
    exact: true,
  },
  {
    path: "/",
    component: Dashboard,
    exact: false,
  },
];
export default routes;
