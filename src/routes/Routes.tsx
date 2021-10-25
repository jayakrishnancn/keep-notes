import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import _404 from "../components/_404";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/404" component={_404} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
