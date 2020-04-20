import { clientRestPxp } from '../clientpxpjs/js/clientRestPxp';
import ClientPxp2 from '../pxpClient2/pxpClient2';

const URL_HOST = '3.133.135.231';
const URL_API = '3.133.135.231/kerp20201';
const URL_TYPE = 'DOMAIN';


export var clientPxp = new clientRestPxp( URL_API, URL_TYPE ); 
export var clientPxp2 = new ClientPxp2( URL_HOST, 'kerp20201/pxp/lib/rest', 'cors'); 
