
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../pages/Auth/UserContext";
import { clientPxp2 } from '../../libs/sdk/config';

const useFetch = (url, params = null ) => {
    const { userContext } = useContext(UserContext);
    
    clientPxp2.prefix = userContext.client.prefix;
    clientPxp2.user = userContext.client.user;
    console.log(clientPxp2);
    // clientPxp2._headers = userContext.client._headers;
    // clientPxp2.pxp = userContext.client.pxp;
    // clientPxp2.pass = userContext.client.pass;
    // clientPxp2.user = userContext.client.user;
    

    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);

    // empty array as second argument equivalent to componentDidMount
    useEffect(() => {
        async function fetchData() {
            let paramsurl = new URLSearchParams();

            if (params ) {
                Object.keys(params).forEach(function(key) {
                    console.log(key, params[key]);    
                    paramsurl.append(key, params[key]);
                });
            } else {
                paramsurl.append('start', '0');
                paramsurl.append('limit', '50');
                paramsurl.append('sort', 'fecha_reg');
                paramsurl.append('dir', 'DESC');
                paramsurl.append('tipo_interfaz', 'SolicitudVb');
                paramsurl.append('contenedor', 'docs-VBSOL');
            }
            
            console.log(paramsurl);
            
            const response = await fetch( clientPxp2.request({ url, params: params }));
            // , {
            //     method: 'POST',
            //     body: paramsurl,
            //     headers: Object.assign({
            //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            //     }, clientPxp2._headers),
            // });
            const json = await response.json();
            setData(json);
            setLoading(false)

        }
        userContext && fetchData();
    }, [url, userContext]);

    return {data, loading};
};


export default useFetch;