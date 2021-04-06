import React from "react";
import css from "./MyApplications.module.scss";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import MyApplicationsList from "./MyApplicationsList/MyApplicationsList";
import MyApplicationDescription from "./MyApplicationDescription/MyApplicationDescription";

const MyApplications = (props) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const routes = [
    {
      exact: true,
      component: <MyApplicationsList />,
      path: url + "",
      name: "My Applications List",
      type: "",
    },
    {
      exact: true,
      component: <MyApplicationDescription />,
      path: url + "/:id",
      name: "My Application Description",
      type: "",
    },
  ];
  return (
    <Switch>
      {routes.map((item, index) => {
        const { exact, component, path } = item;
        return (
          <Route exact={exact} key={index} path={path}>
            {component}
          </Route>
        );
      })}
    </Switch>
  );
};

export default MyApplications;
