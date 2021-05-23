import { Avatar } from "@material-ui/core";
import { Dashboard, Home, ShowChart, Work } from "@material-ui/icons";
import { FaUserAlt } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import React from "react";
import styles from "../css/sidemenu.min.js"
import { Link } from "react-router-dom";

const SideMenu = () => {
  const classes = styles();

  return (
    <div className={classes.sideMenu}>
      <div className={classes.navhead}>
        <Avatar style={{ height: "100px", width: "100px" }} />
        <h5 style={{ fontFamily: "Roboto Slab", color: "white" }}>PMTUTORS</h5>
      </div>

      <ul className={classes.navitems}>
        {sideList.map((val, k) => {
          return (
            <Link to={`${val.path}`} key={k}>
              <li
                className={classes.row}
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SideMenu;

export const sideList = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
    path: "/pmtutorsadmin",
  },
  {
    title: "Jobs",
    icon: <Work />,
    path: "/pmtutorsadmin/jobs",
  },
  {
    title: "Clients",
    icon: <FaUserAlt />,
    path: "/pmtutorsadmin/clients",
  },
  {
    title: "Vetting",
    icon: <GoVerified />,
    path: "/pmtutorsadmin/vets",
  },
  {
    title: "Analysis",
    icon: <ShowChart />,
    path: "/pmtutorsadmin/analysis",
  },
  {
    title: "Home",
    icon: <Home />,
    path: "/",
  },
];