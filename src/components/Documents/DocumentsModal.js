import React from 'react';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import { CloudDownload } from '@material-ui/icons/index';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

import * as datos from './Data.json';

const data = datos.default.datos.map( item => {
    const url = 'http://www.africau.edu/images/default/sample.pdf';
    return {
        ...item,
        url: <a href = { url } target = "_blank"><CloudDownload  style={{ color: green[500] }}/></a>
    }
});




const columns = [
    {
        name: "url",
        label:  "Doc. Digital",
        options: {
         filter: false,
         sort: false,
        }
    },
    {
        name: "nombre_tipo_documento",
        label:  "Nombre Doc.",
        options: {
         filter: true,
         sort: true,
        }
    },
    {
        name: "descripcion_proceso_wf",
        label:  "Descripcion Proceso",
        options: {
         filter: true,
         sort: true,
        }
    },
    {
        name: "nombre_tipo_documento",
        label:  "Docs. Previos",
        options: {
         filter: true,
         sort: true,
        }
    }
];

const options = {
  filterType: 'textField',
  responsive: 'scrollMaxHeight',
  print: false,
  selectableRows: 'none'
};

const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
}));

const DocumentsModal = ({ open, handleClose }) => {
    const classes = useStyles();

    return (
        
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Grid container justify="center">
                <Grid item xs={12} md={10}>
                    <MUIDataTable 
                        title={"Documentos del Proceso"} 
                        data={data} 
                        columns={columns} 
                        options={options} 
                    />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default DocumentsModal;
