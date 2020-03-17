import React from 'react';
import { ListTable } from '../../components/ListTable/ListTable';
import { ModalSiguiente } from './ModalSiguiente';
import { ModalRechazado } from './ModalRechazado';
import DocumentsModal from '../../components/Documents/DocumentsModal';
import { red, green, yellow, blue } from '@material-ui/core/colors';
import { Close, ThumbDownAlt, ThumbUpAlt, MenuBook } from '@material-ui/icons/index';

export const Adquisiciones = () => {
    const [openA, setOpenA] = React.useState(false);
    const [openR, setOpenR] = React.useState(false);
    const [openDoc, setOpenDoc] = React.useState(false);

    const handleOpenA = () => {
      setOpenA(true);
    };

    const handleOpenR = () => {
      setOpenR(true);
    };
  
    const handleCloseA = () => {
      setOpenA(false);
    };

    const handleCloseR = () => {
      setOpenR(false);
    };

    const handleOpenDoc = () => {
      setOpenDoc(true);
    };
  
    const handleCloseDoc = () => {
      setOpenDoc(false);
    };

    const listOptions = [
      { 
        icon: <ThumbDownAlt style={{ color: red[500] }}/>, 
        name: 'Dev. al Solicitante',
        action: handleOpenR
      },
      { 
        icon: <ThumbDownAlt style={{ color: yellow[500] }}/>, 
        name: 'Rechazar',
        action: handleOpenR
      },
      { 
        icon: <ThumbUpAlt style={{ color: green[500] }}/>, 
        name: 'Siguiente Estado',
        action: handleOpenA
      },
      { 
        icon: <MenuBook style={{ color: blue[500] }}/>, 
        name: 'Documentos',
        action: handleOpenDoc
      },
      { 
        icon: <Close style={{ color: red[500] }}/>, 
        name: 'Cerrar' 
      },
  ];

    return (
        <div>
            <ListTable actions={ listOptions }/>
            <ModalSiguiente handleClose={ handleCloseA } open={ openA }/>
            <ModalRechazado handleClose={ handleCloseR } open={ openR }/>
            <DocumentsModal handleClose={ handleCloseDoc } open={ openDoc }/>
        </div>
    )
}
