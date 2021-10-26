import { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import _404 from "../components/_404";
import { useAuth } from "../contexts/AuthContext";
import routes from "./config";
import { DynamicRouteProps } from "./type";

const CustomRoute = (Routeprops: DynamicRouteProps) => {
  const {
    component: Component,
    secret = true,
    exact = true,
    ...rest
  } = Routeprops;
  debugger;
  const { token } = useAuth();
  const isAuthnticated = !secret || (secret && token);

  return (
    <Route
      {...rest}
      render={props =>
        !!isAuthnticated ? (
          <Component {...props} exact={exact} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const Routes = () => {
  console.log(routes);
  debugger;
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter>
        <Switch>
          {routes?.map(item => (
            <CustomRoute key={`path-${item?.path ?? ""}`} {...item} />
          ))}
          <Route key="-broken-404" component={_404} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};
export default Routes;
