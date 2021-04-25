import React from "react";
import css from "./MyCreatedJobs.module.scss";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import MyCreatedJobsList from "./MyCreatedJobsList/MyCreatedJobsList";
import MyCreatedJobDescription from "./MyCreatedJobDescription/MyCreatedJobDescription";

const MyCreatedJobs = (props) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const routes = [
    {
      exact: true,
      component: <MyCreatedJobsList />,
      path: url + "",
      name: "My Created Jobs List",
      type: "",
    },
    {
      exact: true,
      component: <MyCreatedJobDescription />,
      path: url + "/:jobId",
      name: "My Created Job Description",
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

export default MyCreatedJobs;
