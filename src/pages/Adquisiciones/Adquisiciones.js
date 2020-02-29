import React from 'react';
import { ListTable } from '../../components/ListTable/ListTable';
import { ModalSiguiente } from './ModalSiguiente';
import { ModalRechazado } from './ModalRechazado';

export const Adquisiciones = () => {
    const [openA, setOpenA] = React.useState(false);
    const [openR, setOpenR] = React.useState(false);

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

    return (
        <div>
            <ListTable handleOpens={ {
              accept: handleOpenA,
              refused: handleOpenR
            }}/>
            <ModalSiguiente handleClose={ handleCloseA } open={ openA }/>
            <ModalRechazado handleClose={ handleCloseR } open={ openR }/>
        </div>
    )
}
