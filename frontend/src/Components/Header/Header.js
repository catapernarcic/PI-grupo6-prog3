import React, { Component } from "react";
import {Link} from 'react-router-dom'
import './headerStyle.css'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            busqueda: ''
        }
    }

    controlarCambios = (event) => {
        this.setState({busqueda: event.target.value});
    }

    evitarSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        let OpcionesMenu = [{frag: <Link to='/'> Home </Link>}, {frag: <Link to='/peliculas'> Peliculas </Link>}, {frag: <Link to='/series'> Series </Link>}, {frag: <Link to='/favoritos'> Favoritos </Link>}]

        return (
            <nav>
                <img src="/img/logo.jpg" alt="logo" className="logo"></img>
                <ul className="main-nav">
                   {OpcionesMenu.map( (opcion, idx) => <li key={opcion + idx}>{opcion.frag}</li>)}
                </ul>
                <form onSubmit={this.evitarSubmit} className="search-form">
                    <input 
                        type="text" 
                        placeholder="Buscar películas o series..." 
                        value={this.state.busqueda}
                        onChange={this.controlarCambios}
                    />
                    <Link to={`/resultados/todo/${this.state.busqueda}`} className="btn btn-success btn-sm">Buscar</Link>
                </form>
            </nav>
        );
    }
}

export default Header; 