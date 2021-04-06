import Home from "../../pages/Home/Home";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Login from "../../pages/Login/Login";
import ProfileType from "../../pages/ProfileType/ProfileType";

export const MainRoutes = [
  {
    path: "profile-type",
    isProtected: false,
    component: (props) => <ProfileType {...props} />,
  },
  {
    path: "login",
    isProtected: false,
    component: (props) => <Login {...props} />,
  },
  {
    path: "home",
    isProtected: true,
    component: (props) => <Home {...props} />,
  },
  {
    path: "",
    isProtected: false,
    component: (props) => <LandingPage {...props} />,
  },
];
