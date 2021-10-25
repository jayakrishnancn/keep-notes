import { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import routes from "./config";
import { DynamicRouteProps } from "./type";

const CustomRoute = (Routeprops: DynamicRouteProps) => {
  const { component: Component, secret = true, ...rest } = Routeprops;
  const { token } = useAuth();
  const isAuthnticated = !secret || (secret && token);

  return (
    <Route
      {...rest}
      render={props =>
        !!isAuthnticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const Routes = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter>
        <Switch>
          {routes?.map(item => (
            <CustomRoute key={`path-${item?.path ?? ""}`} {...item} />
          ))}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};
export default Routes;
