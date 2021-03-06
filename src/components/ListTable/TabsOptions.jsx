import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    display: 'table-caption',
    lineHeight: 0,
    padding: '3px',
    paddingBottom: '9px',
    minWidth: '50px',
    fontSize: '0.8em',
    textTransform: 'none',

  }
}));

const OptionTabs = withStyles((theme) => ({
  root: {
    borderTop: '1px solid gray',
    backgroundColor: 'white',
    minHeight: 20
  },
  indicator: {
    display: 'flex',
    top: '0%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: '100%',
      width: '100%',
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const OptionTab = withStyles((theme) => ({
  root: {
    minHeight: 20,
    padding: 0,
    textTransform: 'none',
    color: '#000',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(0),
    borderRadius: '0 0 10px 10px',
    border: '1px solid ' +  theme.palette.grey.A200,
    backgroundColor: theme.palette.grey[400],
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);


const OptionTabPanel = withStyles((theme) => ({
  root: {
    border: '1px solid gray',
    borderBottom: 'none',
    backgroundColor: theme.palette.info.light,
    minHeight: 20
  },
}))((props) => <TabPanel {...props}/>);

export default function TabsOptions() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value2, setValue2] = React.useState('update');

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  return (
    <div className={classes.root}>
      <OptionTabPanel value={value} index={0}>
        <Grid container spacing={1}>

            <Grid item>
              <Button color="secondary" variant="outlined" size="large" className={classes.button }>
                  <AddIcon style={{ fontSize: 50 }} ></AddIcon>
                  <label>New</label>
              </Button>
            </Grid>
            <Grid item>
              <Button color="secondary" variant="outlined" size="large" className={classes.button }>
                  <CreateIcon style={{ fontSize: 50 }} ></CreateIcon>
                  <label>Edit</label>
              </Button>
            </Grid>
            <Grid item>
              <Button color="secondary" variant="outlined" size="large" className={classes.button }>
                  <DeleteIcon style={{ fontSize: 50 }} ></DeleteIcon>
                  <label>Delete</label>
              </Button>
            </Grid>
            <Grid item>
              <Button color="secondary" variant="outlined" size="large" className={classes.button }>
                  <UpdateIcon style={{ fontSize: 50 }} ></UpdateIcon>
                  <label>Update</label>
              </Button>
            </Grid>
        </Grid>
      </OptionTabPanel>
      <OptionTabPanel value={value} index={1}>
        <Grid container spacing={1}>

        <Grid item>
          <Button color="inherit" variant="outlined" size="large" className={classes.button }>
              <AddIcon style={{ fontSize: 50 }} ></AddIcon>
              <label>New</label>
          </Button>
        </Grid>
        <Grid item>
          <Button color="inherit" variant="outlined" size="large" className={classes.button }>
              <CreateIcon style={{ fontSize: 50 }} ></CreateIcon>
              <label>Edit</label>
          </Button>
        </Grid>
        <Grid item>
          <Button color="inherit" variant="outlined" size="large" className={classes.button }>
              <DeleteIcon style={{ fontSize: 50 }} ></DeleteIcon>
              <label>Delete</label>
          </Button>
        </Grid>
        <Grid item>
          <Button color="inherit" variant="outlined" size="large" className={classes.button }>
              <UpdateIcon style={{ fontSize: 50 }} ></UpdateIcon>
              <label>Update</label>
          </Button>
        </Grid>
    </Grid>
      </OptionTabPanel>
      <OptionTabPanel value={value} index={2}>
        Item Three
      </OptionTabPanel>
      <AppBar position="static">
        <OptionTabs value={value} onChange={handleChange} aria-label="options tabs">
          <OptionTab label="Item One" {...a11yProps(0)} />
          <OptionTab label="Item Two" {...a11yProps(1)} />
          <OptionTab label="Item Three" {...a11yProps(2)} />
        </OptionTabs>
      </AppBar>
      
    </div>
  );
}