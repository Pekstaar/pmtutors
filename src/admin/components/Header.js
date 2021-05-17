import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  withStyles,
} from "@material-ui/core";
import {
  NotificationsNone,
  PowerSettingsNew,
  Search,
} from "@material-ui/icons";
import React from "react";
import useStyles from "../css/header.min.js"
import fb from "../../config/fbConfig"
import NotificationManager from "react-notifications/lib/NotificationManager";

const Header = ({ classes }) => {
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <InputBase
              placeholder="Search Topics"
              startAdornment={<Search />}
              className={classes.searchInput}
            />
          </Grid>

          <Grid item sm></Grid>

          <Grid item>
            <IconButton>
              <Badge badgeContent={3} color="secondary">
                <NotificationsNone />
              </Badge>
            </IconButton>
            <IconButton onClick={() => fb.auth().signOut().then(() => { NotificationManager.success("Sign Out Success!"); })}>
              <PowerSettingsNew />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar >
  );
};

export default withStyles(useStyles)(Header);