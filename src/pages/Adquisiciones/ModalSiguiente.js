import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 1, 1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        width: '100%'
    },
    header: {
        color: theme.palette.secondary.main,
    }
}));

export const ModalSiguiente = ( { handleClose, open } ) => {
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
            <Card className={classes.paper}>
                <CardHeader color="primary"  title="Datos Principales" className={ classes.header }>
                </CardHeader>
                <CardContent>
                <form>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Siguiente Estado</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"                       
                        >
                            <MenuItem value={1}>Borrador</MenuItem>
                            <MenuItem value={2}>Aprobado</MenuItem>
                            <MenuItem value={3}>Rechazado</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                       
                        >
                            <MenuItem value={1}>Departamento 1</MenuItem>
                            <MenuItem value={2}>Departamento 2</MenuItem>
                            <MenuItem value={3}>Departamento 3</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl  className={classes.formControl}>
                        <TextField  
                            label="Proveido"                          
                            multiline
                            rows={2}
                            variant="standard"
                            rowsMax={4}
                        />
                    </FormControl>
                    <br/>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Funcionario Resp.</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        >
                            <MenuItem value={1}>Juan Mendoza</MenuItem>
                            <MenuItem value={2}>Maria del Barrio</MenuItem>
                            <MenuItem value={3}>Alan Brito</MenuItem>
                        </Select>
                    </FormControl>
                    
                </form>
                <CardActions style={{justifyContent: 'left'}}>
                    <Button color="primary" variant="contained">Cancelar</Button> 
                    <Button color="secondary"  variant="contained">Guardar</Button> 
                </CardActions>
                </CardContent>
            </Card>
        </Modal>
    )
}
