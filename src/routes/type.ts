import { RouteProps } from "react-router-dom";

export interface DynamicRouteProps extends RouteProps {
  path: string;
  exact?: boolean;
  secret?: boolean;
  component?: any;
}
