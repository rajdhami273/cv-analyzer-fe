import React, { useContext, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { AppContext } from "../../AppProvider";
import Header from "../../components/Header/Header";
import { homeRoutes } from "../../core/routes/homeRoutes";
import css from "./Home.scss";

export default function Home() {
  const { userType } = useContext(AppContext);
  const { url, path } = useRouteMatch();
  const [routes] = useState(homeRoutes(url));
  return (
    <>
      <Header routes={homeRoutes(url)} />
      <div className="container py-5 px-4">
        <Switch>
          {routes.map((item, index) => {
            const {
              path,
              exact,
              component: Component,
              allowedUserRoles,
            } = item;
            // if (userType && roles.indexOf(userType) === -1) {
            //   return null; //<Route render={() => <div>Not Allowed</div>} />;
            // }
            return (
              <Route
                exact={exact}
                key={index}
                path={path}
                render={(props) => (
                  <Component
                    {...props}
                    routes={routes.map((item) => {
                      const { component, ...doc } = item;
                      return doc;
                    })}
                    url={url}
                  />
                )}
              />
            );
          })}
        </Switch>
      </div>
    </>
  );
}
