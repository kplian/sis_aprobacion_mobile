import React from 'react';
import { ListTable } from '../../components/ListTable/ListTable.jsx';
import { ModalSiguiente } from './ModalSiguiente';
import { ModalRechazado } from './ModalRechazado';
import DocumentsModal from '../../components/Documents/DocumentsModal';
import { red, green, yellow, blue } from '@material-ui/core/colors';
import { Close, ThumbDownAlt, ThumbUpAlt, MenuBook } from '@material-ui/icons/index';

import useFetch from "../../libs/sdk/useFetch";
import MaterialTable from 'material-table';
import Split from 'react-split';
import SplitPane from 'react-split-pane';
import './css.css';

const URL_ADQ = 'adquisiciones/Solicitud/listarSolicitud';
const paramsADQ = {
  'start': '0',
  'limit': '50',
  'sort': 'fecha_reg',
  'dir': 'DESC',
  'tipo_interfaz': 'SolicitudVb',
  'contenedor': 'docs-VBSOL',
};
// ../../sis_workflow/control/DocumentoWf/listarDocumentoWf
const URL_DOCS = 'workflow/DocumentoWf/listarDocumentoWf';
let paramsDocs = {
  "start":"0",
  "limit":"50",
  "sort":"id_documento_wf",
  "dir":"ASC",
  "modoConsulta":"no",
  "todos_documentos":"si",
  "anulados":"no",
  "id_proceso_wf":"9uuyt.w.ty.999euqiiwrew8",
  
  "contenedor":"ext-gen229"
};

const Detail = ( {id} ) => {
  //../../sis_adquisiciones/control/SolicitudDet/listarSolicitudDet
  const params = {
    "start":"0",
    "limit":"50",
    "sort":"id_solicitud_det",
    "dir":"ASC",
    "id_solicitud": id
    // "id_solicitud": "uu9u 98e8yr.99teweqw"
  };
  
  const {data, loading: loadingDoc } = useFetch( 'adquisiciones/SolicitudDet/listarSolicitudDet', params );

  return (

    <div
      style={{
        fontSize: 100,
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#43A047',
        marginLeft: '50px'
      }}
    >
      <MaterialTable
        title=""
        columns={[
          { title: 'Centro de Costos', field: 'desc_centro_costo' },
          { title: 'Concepto', field: 'nombre_partida' },
          { title: 'Orden Trabajo', field: 'desc_orden_trabajo' },
          // {
          //   title: 'Birth Place',
          //   field: 'birthCity',
          //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
          // },
        ]}
        data={data && data.datos? data.datos:[]}        
        options={{
          search: false,
          toolbar: false,
          paging: false,
          headerStyle: {
            backgroundColor: '#39a7ff',
            color: '#FFF'
          }
        }}
      />
    </div>
  )
}

export const Adquisiciones = () => {
  const [openA, setOpenA] = React.useState(false);
  const [openR, setOpenR] = React.useState(false);
  const [openDoc, setOpenDoc] = React.useState(false);
  const {data: dataADQ, loading} = useFetch( URL_ADQ, paramsADQ );
  const {data: dataDoc, loading: loadingDoc } = useFetch( URL_DOCS, paramsDocs );

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
        <div style={{
          minWidth: '100%',
          maxHeight: '100%'
        }}>
            {/*
              <ListTable actions={ listOptions }/>
            */}
            <SplitPane split="vertical" minSize={150}>
                <div><h1>HOLA 1</h1></div>
              <SplitPane split="horizontal">
                  <div>
                    <ListTable actions={ listOptions } data={ dataADQ && dataADQ.datos? dataADQ.datos:[] } detail={ Detail }/>
                  </div>
                  <div>
                    <ListTable actions={ listOptions } data={ dataADQ && dataADQ.datos? dataADQ.datos:[] } detail={ Detail }/>
                  </div>
                </SplitPane>
            </SplitPane>

            <ModalSiguiente handleClose={ handleCloseA } open={ openA }/>
            <ModalRechazado handleClose={ handleCloseR } open={ openR }/>
            <DocumentsModal handleClose={ handleCloseDoc } open={ openDoc }/>
        </div>
    )
}
