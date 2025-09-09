import React from "react";
import {Link} from 'react-router-dom'

function Header() {
    
    let OpcionesMenu = [{frag: <Link to='/'> Home </Link>}, {frag: <Link to='/peliculas'> Peliculas </Link>}, {frag: <Link to='/series'> Series </Link>}, {frag: <Link to='/favs'> Favoritos </Link>}]

  return (
    <nav>
        <p>el header va a tener un nav con el logo, home, series, peliculas, favs</p>
        <ul className="main-nav">
           {OpcionesMenu.map( (opcion, idx) => <li key={opcion + idx}>{opcion.frag}</li>)}
        </ul>

    </nav>
  );
}

export default Header; 