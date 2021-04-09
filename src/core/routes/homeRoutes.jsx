import Dashboard from "../../pages/Home/Dashboard/Dashboard";
import FindJobs from "../../pages/Home/FindJobs/FindJobs";
import Messages from "../../pages/Home/Messages/Messages";
import MyApplications from "../../pages/Home/MyApplications/MyApplications";
import MyCreatedJobs from "../../pages/Home/MyCreatedJobs/MyCreatedJobs";
import CreateJob from "../../pages/Home/CreateJob/CreateJob";

export const homeRoutes = url => [
  {
    name: "Dashboard",
    path: url + "",
    exact: !false,
    component: Dashboard,
    roles: ["employer", "candidate"]
  },
  {
    name: "Create Job",
    path: url + "/create-job",
    exact: false,
    component: CreateJob,
    roles: ["company"]
  },
  {
    name: "Find Jobs",
    path: url + "/find-jobs",
    exact: false,
    component: FindJobs,
    roles: ["candidate"]
  },
  {
    name: "My Applications",
    path: url + "/my-applications",
    exact: false,
    component: MyApplications,
    roles: ["candidate"]
  },
  {
    name: "My Created Jobs",
    path: url + "/my-created-jobs",
    exact: false,
    component: MyCreatedJobs,
    roles: ["employer"]
  },
  {
    name: "Messages",
    path: url + "/messages",
    exact: !false,
    component: Messages,
    roles: ["employer", "candidate"]
  }
];
