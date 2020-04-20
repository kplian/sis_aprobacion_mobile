import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Snackbar from '@material-ui/core/Snackbar';


import RouterBreadcrumbs from './Breadcrumb';
import TransferList from './TransferList';

const useStyles = makeStyles( theme =>({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(2),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardheader: {
      backgroundColor: theme.palette.grey[100],
      borderBottom: '1px solid grey ' ,
      color:theme.palette.primary.main 
  }
}));

export default function TableSample() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;
    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };
  return (
    <>
        <Card className={classes.root}>
        <CardHeader title="Demo List Edit Table" className={classes.cardheader}/>
        <MaterialTableDemo/>
        </Card>

        <Card className={classes.root}>
        <CardHeader title="Demo Toast" className={classes.cardheader}/>
        <CardContent>
            <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>Top-Center</Button>
            <Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>Top-Right</Button>
            <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}>
                Bottom-Right
            </Button>
            <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
                Bottom-Center
            </Button>
            <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })}>Bottom-Left</Button>
            <Button onClick={handleClick({ vertical: 'top', horizontal: 'left' })}>Top-Left</Button>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open}
                onClose={handleClose}
                autoHideDuration={6000}
            >
                <Alert severity="success" onClose={handleClose}>
                    <AlertTitle>Success</AlertTitle>
                    This is a success alert — check it out!
                </Alert>
            </Snackbar>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — check it out!
            </Alert><br/>
            <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                This is a warning alert — check it out!
            </Alert><br/>
            <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                This is an info alert — check it out!
            </Alert><br/>
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                This is a success alert — check it out!
            </Alert><br/>
        </CardContent>
        </Card>

        <Card className={classes.root}>
        <CardHeader title="Breadcrumbs" className={classes.cardheader}/>
          <RouterBreadcrumbs/>
        </Card>
        <Card className={classes.root}>
        <CardHeader title="TransferList" className={classes.cardheader}/>
          <TransferList/>
        </Card>
    </>
  )
}

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  
function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Year', field: 'year', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'city',
        lookup: { 34: 'Bolivia', 63: 'Brasil' },
      },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', year: 1987, city: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        year: 2017,
        city: 34,
      },
    ],
  });

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={state.data}
      icons={tableIcons}
      options={{
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF'
        }
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}