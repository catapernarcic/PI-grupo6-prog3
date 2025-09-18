import React, { Component } from 'react';
import Pelicula from '../../Components/Pelicula/Pelicula';
import { Link } from 'react-router-dom';
import './Home.css';

let apiKey = "0b687acd5250ddef9e6794dc722be275";

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            peliculasPopulares: [],
            peliculasCartelera: [],
            cargandoPopulares: true,
            cargandoCartelera: true
        }
    }
    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then(respuesta => respuesta.json())
        .then(data => this.setState({
            peliculasPopulares: data.results,
            cargandoPopulares: false
        }))
        .catch(error => console.log(error))

        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
        .then(respuesta => respuesta.json())
        .then(data => this.setState({
            peliculasCartelera: data.results,
            cargandoCartelera: false
        }))
        .catch(error => console.log(error))
    }
    render(){
        return(
            <React.Fragment>
                {/* Sección Películas Populares */}
                <h2 className="alert alert-primary">Popular movies this week</h2>
                {this.state.cargandoPopulares ? <p>Cargando...</p> : <Pelicula peliculas={this.state.peliculasPopulares.slice(0,4)}/>}

                {/* Sección Películas en Cartelera */}
                <h2 className="alert alert-primary">Movies now playing</h2>
                {this.state.cargandoCartelera ? <p>Cargando...</p> : <Pelicula peliculas={this.state.peliculasCartelera.slice(0,4)}/>}
            </React.Fragment>
        )
    }
}

export default Home;