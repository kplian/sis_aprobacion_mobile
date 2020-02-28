import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DeleteIcon, MoreVert, Close, ThumbDownAlt, ThumbUpAlt, ExpandMore } from '@material-ui/icons/index';
import FolderIcon from '@material-ui/icons/Folder';
import Divider from '@material-ui/core/Divider';
/////
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { red, green, yellow } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';

import { data } from './demodata';

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
        backgroundColor: theme.palette.dark.main,
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

function generate(element) {
    return data.map(value =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

const listOptions = [
    { icon: <ThumbDownAlt style={{ color: red[500] }}/>, name: 'Dev. al Solicitante'},
    { icon: <ThumbDownAlt style={{ color: yellow[500] }}/>, name: 'Rechazar' },
    { icon: <ThumbUpAlt style={{ color: green[500] }}/>, name: 'Siguiente Estado' },
    { icon: <Close style={{ color: red[500] }}/>, name: 'Cerrar' },
]
  

export const ListTable = () => {
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
        {listOptions.map((item, index) => (
          <ListItem button key={item.name}>
            <ListItemIcon color="danger">{ item.icon }</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

    return (
        <div>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" className={classes.title} color="secondary">
            Visto Bueno Solicitud
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
                <Divider/>
              {data.map( (item, index) =>(<div>
                <ListItem button={true} onClick={ ()=> handleClick(index)}>
                    <ListItemIcon>
                        <ExpandMore />
                    </ListItemIcon>
                  <ListItemText
                    primary={<React.Fragment>
                        <Box display="flex">
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
    )
}
