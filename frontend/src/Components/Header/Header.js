import React from "react";
import {Link} from 'react-router-dom'
import './headerStyle.css'

function Header() {
    
    let OpcionesMenu = [{frag: <Link to='/'> Home </Link>}, {frag: <Link to='/peliculas'> Peliculas </Link>}, {frag: <Link to='/series'> Series </Link>}, {frag: <Link to='/favs'> Favoritos </Link>}]

  return (
    <nav>
        <img src="/img/logo.jpg" alt="logo" className="logo"></img>
        <ul className="main-nav">
           {OpcionesMenu.map( (opcion, idx) => <li key={opcion + idx}>{opcion.frag}</li>)}
        </ul>

    </nav>
  );
}

export default Header; 