import React from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import FindJobDescription from "./FindJobDescription/FindJobDescription";
import css from "./FindJobs.module.scss";
import FindJobsList from "./FindJobsList/FindJobsList";

const FindJobs = (props) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const routes = [
    {
      exact: true,
      component: <FindJobsList />,
      path: url + "",
      name: "Find Jobs List",
      type: "",
    },
    {
      exact: true,
      component: <FindJobDescription />,
      path: url + "/:id",
      name: "Find Job Description",
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

export default FindJobs;
