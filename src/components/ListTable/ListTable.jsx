import React, { useState } from 'react';
import MaterialTable from 'material-table';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MoreVert, ExpandMore } from '@material-ui/icons/index';
import FolderIcon from '@material-ui/icons/Folder';
import Divider from '@material-ui/core/Divider';
/////
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';

// import { data } from './demodata';

//hooks
import { useWindowSize } from '../../pages/Dashboard/resize-window';
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

import TabsOptions from './TabsOptions';

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

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    drawer: {
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white, 
    },
    inline: {
        display: 'inline',
    },
    importe: {
        color: theme.palette.success.main,
        textAlign: "right",

    }
}));


// export const ListTable = ({ data, actions }) => {
export const ListTable = ({ data, actions, detail }) => {
    const [w, h] = useWindowSize();
    const classes = useStyles();
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [side]: open });
    };

    const handleClick = (index : any)  => {
        setState({  ...state, [index]: !state[index] });
    }

    const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List className={ classes.drawer }>
        {actions.map((item, index) => (
          <ListItem button key={item.name} onClick={ item.action }>
            <ListItemIcon color="danger">{ item.icon }</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

    return (
        <div>
        {
          w <= 700 ? (
        <div>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" className={classes.title} color="secondary">
            Visto Bueno Solicitud
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
                <Divider/>
              {data.map( (item, index) =>(<div key={index} >
                <ListItem button onClick={ ()=> handleClick(index)}>
                    <ListItemIcon>
                        <ExpandMore />
                    </ListItemIcon>
                  <ListItemText
                    primary={<React.Fragment>
                        <Box display="flex"
                             flexWrap="wrap">
                            <Box flexGrow={1}>
                                <Typography
                                component="span"
                                variant="subtitle1"
                                className={classes.inline}
                                color="inherit"
                                >
                                {item.num_tramite}
                                </Typography> 
                            </Box>
                            <Box>
                                <Typography
                                component="span"
                                variant="overline"
                                className={classes.importe}
                                color="error"
                                >
                                    <b>Total: </b>{ item.importe_total + ' ' +item.desc_moneda }
                                </Typography>
                            </Box>
                        </Box>
                        </React.Fragment> }
                    secondary={ <React.Fragment>
                        <Typography
                          component="span"
                          variant="caption"
                          className={classes.inline}
                          color="secondary"
                        >
                          {item.desc_funcionario}
                        </Typography>
                        <br/>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="primary"
                        >
                        { item.fecha_soli }
                        </Typography>
                      </React.Fragment> }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="options" color="primary" onClick={toggleDrawer('bottom', true)}> 
                      <MoreVert />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={state[index]} timeout="auto" unmountOnExit={true}>
                    <Grid>
                        <ul>
                            <li>Mas informacion......</li>
                            <li>Mas informacion......</li>
                            <li>Mas informacion......</li>
                            <li>Mas informacion......</li>
                            <li>Mas informacion......</li>
                        </ul>
                    </Grid>
                </Collapse>
                <Divider/></div>
              ))}
            </List>
          </div>
        </Grid>
        <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)}>
            {fullList('bottom')}
        </Drawer>
        </div>
        ):(
          <div>
          <Typography variant="h6" className={classes.title} color="secondary">
            Visto Bueno Solicitud
          </Typography>
          <TabsOptions/>
          <ViewTable data={data} detail={detail}/>
          </div>
        )}
        </div>
    )
}


const ViewTable = ( props ) => {
  const Detail = props.detail;
  return (
  <>
    <MaterialTable
      title=""
      icons={tableIcons}
      columns={[
        { title: 'Numero Tramite', field: 'num_tramite' },
        { title: 'Funcionario', field: 'desc_funcionario' },
        { title: 'Importe Total', field: 'importe_total', type: 'numeric' },
        {
          title: 'Moneda',
          field: 'desc_moneda',
          lookup: { 34: 'BS', 63: '$' },
        },
      ]}
      data={props.data}        
      options={{
        filtering: true,
        showTitle: false,
        rowStyle: {
   
        },
        searchFieldAlignment: 'left',
        search: true,
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF'
        }
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
      detailPanel={[
        {
          tooltip: 'Show Detail',
          render: rowData => {
            return (
              <Detail id={ rowData.id_solicitud }/>
            )
          } 
        }]}
    />
  </>
)};
