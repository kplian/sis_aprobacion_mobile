import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { NavLink, Link } from 'react-router-dom';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    // paddingLeft: theme.spacing(1),
    wordWrap: 'break-word',
    backgroundColor: theme.palette.grey[800],
  },
  navlink: {
    color: theme.palette.grey[50],
    textDecoration: 'none'
  },
  icon: {
    color: theme.palette.secondary.light,
  }
}));

export const MenuItems = ( ) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
  <div>
  
  <NavLink to="/" className={ classes.navlink }>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon className={ classes.icon }/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </NavLink>
  <ListItem button  onClick={handleClick}>
      <ListItemIcon>
          <ShoppingCartIcon className={ classes.icon }/>
      </ListItemIcon>
      <ListItemText primary="Adquisiciones" />
      {open ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
  <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavLink to="/adquisiciones"  className={ classes.navlink }>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ArrowRightIcon className={ classes.icon }/>
              </ListItemIcon>
              <ListItemText primary="Visto Bueno Solicitud" />
            </ListItem>
          </NavLink>
          <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ArrowRightIcon className={ classes.icon }/>
              </ListItemIcon>
              <ListItemText primary="Submenu 2" />
          </ListItem>
          <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ArrowRightIcon className={ classes.icon }/>
              </ListItemIcon>
              <ListItemText primary="Submenu 3" />
            </ListItem>
        </List>
  </Collapse>
        
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon className={ classes.icon }/>
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon className={ classes.icon }/>
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon className={ classes.icon }/>
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
  </div>
)
};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);