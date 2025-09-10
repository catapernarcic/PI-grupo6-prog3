import React from 'react';
import{Link} from 'react-router-dom';
import './NF.css'

function NotFound(){
    return(
        <section>
            <h1>Error 404</h1>
            <h2>Pagina no encontrada</h2>
            <Link to='/' className="link">Click para volver al home</Link>
        </section>
    );
};

export default NotFound;