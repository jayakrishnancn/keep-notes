import { lazy } from "react";
import Dashboard from "../pages/Dashboard";
import { DynamicRouteProps } from "./type";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const _404 = lazy(() => import("../components/_404"));

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
  },
  {
    path: "/",
    component: Dashboard,
    exact: true,
    secret: false,
  },
];
export default routes;
