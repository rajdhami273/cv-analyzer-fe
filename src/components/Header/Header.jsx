import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../../AppProvider";
import css from "./Header.module.scss";

const Header = ({ routes }) => {
  const { userType, resetApp } = useContext(AppContext);
  const location = useLocation();
  const history = useHistory();
  const goToHome = () => history.push("/home");
  const logout = () => {
    resetApp();
    // history.replace("/home", "/");
    history.push("/");
  };
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.logo} onClick={goToHome}>
          CVAnalyzer
        </div>
        <div className={css.linksContainer}>
          {routes.map((item, index) => {
            const { name, path, exact, roles } = item;
            if (roles.indexOf(userType) === -1) {
              return null;
            }
            return (
              <Link
                key={index}
                to={path}
                className={`${css.links} ${!exact &&
                  location.pathname.match(path) &&
                  css.active} ${location.pathname === path && css.active}`}
              >
                {name}
              </Link>
            );
          })}
          <a className={css.links} onClick={logout}>
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
