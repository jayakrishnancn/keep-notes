import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import _404 from "../components/_404";
import { useAuth } from "../contexts/AuthContext";
import routes from "./config";
import { DynamicRouteProps } from "./type";

const CustomRoute = (routeprops: DynamicRouteProps) => {
  const {
    component: Component,
    secret = true,
    exact = true,
    ...rest
  } = routeprops;
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
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 text-purple-800 text-center mt-20">
          <FontAwesomeIcon icon={faSpinner} pulse size="6x" />
        </div>
      }
    >
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
