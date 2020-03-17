/******************************************************************************
 Copyright(c) 2019 by
 Disydes - Kplian
 All rights reserved
 ******************************************************************************
 NAME:         js/testRest.js
 DEVELOPER:    Favio Figueroa P (finguer)
 DESCRIPTION:  Example for using the rest
 REVISIONS:
 Date          Issue   Author             Description
 ---------     ------  --------------     ------------------------------------
 25-DEC-2019   0        Favio Figueroa    Created
 ******************************************************************************/

import {md5} from './md5.js';
import {clientRestPxp} from './clientRestPxp.js';

let client = new clientRestPxp('your.com', 'DOMINIO');
client.setCredentialsPxp('user', md5('password'));
client.genHeaders();

client.verifyUser(function (resp) {
    console.log('verifyUser', resp)
});

var params = new URLSearchParams();
params.append('id_periodo', '84'); // some param for example

client.request('seguridad/Persona/listarPersona2', params, function (resp) {
    console.log('resp', resp)
});
