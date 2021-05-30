import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import JobsTable from './JobsTable';
import Submitted from './Submitted';
import ClientsTable from './clientsTable';
import SuspendedClients from './SuspendedClients';

function TabPanel(props) {
    const { page, children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (

                <div className="pt-1">{children}</div>

            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
}));

export default function NavTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: "white", color: "#000", boxShadow: "none" }}>
                {props.page === "jobs" ?
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="nav tabs example"
                    >
                        <LinkTab label="All Jobs" href="/jobs" {...a11yProps(0)} />
                        <LinkTab label="Submitted" href="/jobs/submitted" {...a11yProps(1)} />
                        {/* <LinkTab label="Page Three" href="/spam" {...a11yProps(2)} /> */}
                    </Tabs>
                    : props.page === "clients" ?
                        <Tabs
                            variant="fullWidth"
                            value={value}
                            onChange={handleChange}
                            aria-label="nav tabs example"
                        >
                            <LinkTab label="Active Clients" href="/clients" {...a11yProps(0)} />
                            <LinkTab label="Suspended Clients" href="/suspended-clients" {...a11yProps(1)} />

                            {/* <LinkTab label="Page Three" href="/spam" {...a11yProps(2)} /> */}
                        </Tabs>
                        :
                        ""
                }
            </AppBar>

            {props.page === "jobs" ?
                <div>
                    <TabPanel value={value} index={0}>
                        <JobsTable getOneJob={props.getOneJob} prop={props.prop} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Submitted />
                    </TabPanel>
                </div>
                : props.page === "clients" ?
                    <div>
                        <TabPanel value={value} index={0}>
                            <ClientsTable />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <SuspendedClients />
                        </TabPanel>
                    </div>
                    :
                    ""
            }


        </div >
    );
}